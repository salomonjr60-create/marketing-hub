import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "marketing-hub | UAE Digital Marketing & ROAS Analytics",
  description: "Enterprise digital marketing suite: Meta Ads, Google Ads, SEO, Email, Instagram, and LinkedIn with real-time ROAS and lead tracking in AED.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#070e1c] text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
