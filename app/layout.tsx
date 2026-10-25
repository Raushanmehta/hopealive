import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navbar, { NavbarFallback } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { site } from "@/data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HopeAlive Foundation - Non-Profit & Humanitarian Aid",
  description: "HopeAlive is a global non-profit organization dedicated to empowering vulnerable children, supporting families, and uplifting communities through education, healthcare, and humanitarian aid.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} ${poppins.className} font-sans h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col font-sans ${poppins.className}`}>
        <Suspense fallback={<NavbarFallback data={site.navbar} />}>
          <Navbar data={site.navbar} />
        </Suspense>
        {children}
        <Footer data={site.footer} />
      </body>
    </html>
  );
}
