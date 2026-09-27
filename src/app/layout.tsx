import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import FloatingNav from "@/components/layout/FloatingNav";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinworkspace.vercel.app"),
  title: {
    default: "Kelvin Marcello — Full Stack Developer",
    template: "%s — Kelvin Marcello",
  },
  description:
    "Full Stack Developer & AI Integrator based in Surabaya, Indonesia. Building modern web applications with Next.js, TypeScript, and React.",
  keywords: ["Full Stack Developer", "Next.js", "TypeScript", "React", "AI", "Portfolio", "Kelvin Marcello", "Surabaya"],
  authors: [{ name: "Kelvin Marcello", url: "https://vinworkspace.vercel.app" }],
  creator: "Kelvin Marcello",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vinworkspace.vercel.app",
    siteName: "Kelvin Marcello",
    title: "Kelvin Marcello — Full Stack Developer",
    description:
      "Full Stack Developer & AI Integrator based in Surabaya, Indonesia. Building modern web applications with Next.js, TypeScript, and React.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kelvin Marcello — Full Stack Developer & AI Integrator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelvin Marcello — Full Stack Developer",
    description:
      "Full Stack Developer & AI Integrator based in Surabaya, Indonesia.",
    images: ["/og-image.jpg"],
    creator: "@vinworkspace",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="theme-light min-h-screen flex flex-col overflow-x-hidden selection:bg-accent/20 selection:text-accent">
        <LenisProvider>
          <FloatingNav />
          <main className="flex-1 w-full relative">
            {children}
          </main>
          <ScrollToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
