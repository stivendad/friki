import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { Provider } from "@/components";



export const metadata: Metadata = {
  title: {
    template: '%s - friki | Shop',
    default: 'Home - friki | Shop'
  },
  description: "Una tienda virutal de productos geek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
