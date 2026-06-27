import type { Metadata } from "next";
import { Onest, Geist_Mono } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoiceSync — Admin Command Center",
  description: "VoiceSync Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${onest.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased grid-bg">
        <div className="radial-atmosphere fixed inset-0 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
