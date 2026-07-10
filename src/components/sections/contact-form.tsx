"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { contactSchema, type ContactFormData, type ContactFieldErrors } from "@/lib/contact-schema";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";
const EMPTY: ContactFormData = { name: "", email: "", subject: "", message: "" };

function Field({ id, label, as = "input", type = "text", value, error, touched, rows, onChange, onBlur }: {
  id: keyof ContactFormData; label: string; as?: "input" | "textarea"; type?: string;
  value: string; error?: string; touched: boolean; rows?: number;
  onChange: (v: string) => void; onBlur: () => void;
}) {
  const invalid = touched && Boolean(error);
  const base = cn("w-full rounded-sm border bg-paper/50 px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-steel", invalid ? "border-red-500 focus:border-red-500" : "border-line-strong focus:border-signal");
  return (
    <div>
      <label htmlFor={id} className="text-mono-label mb-2 block text-steel">{label}</label>
      {as === "textarea" ? <textarea id={id} value={value} rows={rows ?? 5} required aria-invalid={invalid || undefined} onChange={e => onChange(e.target.value)} onBlur={onBlur} className={base} /> : <input id={id} type={type} value={value} required aria-invalid={invalid || undefined} onChange={e => onChange(e.target.value)} onBlur={onBlur} className={base} />}
      <AnimatePresence>{invalid && <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 6 }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-sm text-red-500">{error}</motion.p>}</AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormData>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(v: ContactFormData): ContactFieldErrors {
    const result = contactSchema.safeParse(v);
    if (result.success) return {};
    return Object.fromEntries(result.error.issues.map(i => [i.path[0], i.message]));
  }

  function updateField(field: keyof ContactFormData, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  }

  function handleBlur(field: keyof ContactFormData) {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allErrors = validate(values);
    setErrors(allErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(allErrors).length > 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await res.json();
      if (!res.ok) {
        if (data.error?.includes("not configured")) {
          window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(values.message + "\n\n— " + values.name + " (" + values.email + ")")}`;
          setStatus("success");
        } else { setStatus("error"); }
      } else { setStatus("success"); }
    } catch { setStatus("error"); }
  }

  if (status === "success") return (
    <motion.div role="status" aria-live="polite" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 rounded-sm border border-line-strong bg-paper/50 py-16 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-signal"><CheckCircle2 size={24} className="text-signal" /></motion.div>
      <div><p className="font-display text-lg font-bold text-ink">Message sent!</p><p className="mt-1 max-w-sm text-sm text-steel">Thanks for reaching out — I&apos;ll get back to you soon.</p></div>
      <Button variant="outline" type="button" onClick={() => { setValues(EMPTY); setErrors({}); setTouched({}); setStatus("idle"); }}>Send another message</Button>
    </motion.div>
  );

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label="NAME" value={values.name} error={errors.name} touched={Boolean(touched.name)} onChange={v => updateField("name", v)} onBlur={() => handleBlur("name")} />
        <Field id="email" label="EMAIL" type="email" value={values.email} error={errors.email} touched={Boolean(touched.email)} onChange={v => updateField("email", v)} onBlur={() => handleBlur("email")} />
      </div>
      <Field id="subject" label="SUBJECT" value={values.subject} error={errors.subject} touched={Boolean(touched.subject)} onChange={v => updateField("subject", v)} onBlur={() => handleBlur("subject")} />
      <Field id="message" label="MESSAGE" as="textarea" rows={6} value={values.message} error={errors.message} touched={Boolean(touched.message)} onChange={v => updateField("message", v)} onBlur={() => handleBlur("message")} />
      {status === "error" && <p role="alert" className="text-sm text-red-500">Something went wrong. You can email me directly at <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.</p>}
      <div>
        <Magnetic>
          <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
            {status === "loading" ? <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" aria-hidden />Sending…</span> : <span className="flex items-center gap-2"><Send size={14} aria-hidden />Send Message</span>}
          </Button>
        </Magnetic>
      </div>
    </form>
  );
}
