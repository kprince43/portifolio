import type { Metadata } from "next";
import { Archivo, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { siteConfig } from "@/data/site";
import "@/styles/globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", weight: ["600","700","800","900"] });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans", weight: ["400","500","600"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400","500"] });

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.tagline,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${publicSans.variable} ${plexMono.variable} font-body`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <BackToTop />
          <CursorFollower />
        </ThemeProvider>
      </body>
    </html>
  );
}
