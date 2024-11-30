import "./globals.css";

import type { Metadata } from "next";
import { geistSans, geistMono, inter } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { Header } from "./_components/Header";
import Providers from "@/providers";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "Bskypt | Bluesky Social Receipts",
  description: "Generate social receipts for you BlueSky activity.",
};

export default function RootLayout({
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
