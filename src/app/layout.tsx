import type { Metadata } from "next";
import "./globals.css";
import "bulma/css/bulma.min.css";

export const metadata: Metadata = {
  title: "Lyrebird Lite",
  description: "A lyrebird mimic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // disable bulma automatic dark theme
    <html lang="en" className="theme-light">
      <body>{children}</body>
    </html>
  );
}
