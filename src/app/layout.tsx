import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";



export const metadata: Metadata = {
  title: "friki | Shop",
  description: "Una tienda virutal de productos geek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
