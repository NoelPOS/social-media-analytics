import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media Analytics Course",
  description: "Comprehensive social media analytics training platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} brand-bg min-h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
