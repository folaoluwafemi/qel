import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qel — Knowledge Meets Agency",
  description: "The Personal Cognitive OS & Sovereign Thinking Partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
