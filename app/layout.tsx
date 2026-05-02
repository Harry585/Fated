import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANU Match MVP",
  description: "A no-swipe matching MVP for verified ANU students."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
