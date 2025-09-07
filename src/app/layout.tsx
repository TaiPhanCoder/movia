import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movia - Ứng dụng Khám phá Phim",
  description: "Khám phá và trải nghiệm phim với Movia - được hỗ trợ bởi TMDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden grid min-h-dvh grid-rows-[auto_1fr_auto] bg-background text-foreground`}
      >
        <Providers>
          <SiteHeader />
          <main className="">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
