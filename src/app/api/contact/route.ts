import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  const body = await request.json();
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return NextResponse.json({ error: "Email sending is not configured yet on this server." }, { status: 503 });
  }
  const { name, email, subject, message } = result.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: "Portfolio Contact <onboarding@resend.dev>", to: toEmail, reply_to: email, subject: `${subject} — from ${name}`, text: `${message}\n\n— ${name} (${email})` }),
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
