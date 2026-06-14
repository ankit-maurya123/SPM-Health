import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SPMHealth — Modern Healthcare, Compassionate Care",
    template: "%s · SPMHealth",
  },
  description:
    "SPMHealth offers expert doctors, advanced diagnostics, and patient-first treatment across multiple specialties. Book your appointment today.",
  keywords: [
    "doctor",
    "healthcare",
    "hospital",
    "appointment",
    "medical",
    "cardiology",
    "neurology",
    "SPMHealth",
  ],
  authors: [{ name: "SPMHealth" }],
  openGraph: {
    type: "website",
    siteName: "SPMHealth",
    title: "SPMHealth — Modern Healthcare, Compassionate Care",
    description:
      "Expert doctors, advanced diagnostics, and a patient-first journey at SPMHealth.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SPMHealth — Modern Healthcare, Compassionate Care",
    description:
      "Expert doctors, advanced diagnostics, and a patient-first journey at SPMHealth.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              name: "SPMHealth",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "SPMHealth — modern multi-specialty healthcare with expert doctors and patient-first care.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2nd Floor, Wellness Tower, MG Road",
                addressLocality: "Bengaluru",
                postalCode: "560001",
                addressCountry: "IN",
              },
              telephone: "+91-99999-99999",
              email: "hello@spmhealth.com",
              sameAs: [],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "14px",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.6)",
              color: "#0b2447",
            },
          }}
        />
      </body>
    </html>
  );
}
