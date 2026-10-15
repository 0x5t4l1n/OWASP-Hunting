import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SITE_CONFIG } from "@/lib/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: "%s — OWASP Hunting",
    default: "OWASP Hunting — Security Testing Documentation",
  },
  description:
    "Documentation for the OWASP Hunting project. A comprehensive collection of security testing resources, payloads, and methodology for authorized penetration testing and bug bounty research.",
  keywords: [
    "OWASP",
    "security testing",
    "penetration testing",
    "bug bounty",
    "payloads",
    "SQL injection",
    "XSS",
    "SSRF",
    "vulnerability research",
  ],
  authors: [{ name: "OWASP Hunting Contributors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: "OWASP Hunting",
    title: "OWASP Hunting — Security Testing Documentation",
    description:
      "Documentation for the OWASP Hunting project. Security testing resources, payloads, and methodology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OWASP Hunting — Security Testing Documentation",
    description:
      "Documentation for the OWASP Hunting project. Security testing resources, payloads, and methodology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          backgroundColor: "var(--color-canvas)",
          color: "var(--color-ink)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {children}
        {Boolean(SITE_CONFIG.basePath) && (
          <Script
            src={`${SITE_CONFIG.basePath}/redirect-to-primary.js`}
            strategy="beforeInteractive"
          />
        )}
      </body>
    </html>
  );
}
