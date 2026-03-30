import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life Atlas — Investor Portal",
  description: "Pre-Seed Investment Opportunity | Biological Digital Twins for Longevity",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
