import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import FloatingNav from "@/components/layout/FloatingNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kelvin | Full Stack Developer",
  description: "Professional portfolio of Kelvin, Full Stack Developer & AI Enthusiast.",
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
        </LenisProvider>
      </body>
    </html>
  );
}
