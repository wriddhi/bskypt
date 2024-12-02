import "./globals.css";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { geistSans, geistMono, inter } from "@/config/fonts";

import Providers from "@/providers";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "Bskypt | Bluesky Social Receipts",
  description: "Generate social receipts for you BlueSky activity.",
  verification: {
    google: "hhYLEVPRTPLp3Y3stbEOef-9vHQbX_6xuqzPlsQeP3U",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          inter.variable,
          "font-sans selection:text-background selection:bg-foreground",
          "antialiased bg-muted text-foreground relative",
          "scrollbar-hide [&_*]:scrollbar-hide scroll-m-0"
        )}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
