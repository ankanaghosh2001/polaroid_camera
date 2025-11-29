import type { Metadata } from "next";
import { Berkshire_Swash } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PhotoProvider } from "@/context/PhotoContext";
import { Toaster } from "@/components/ui/sonner";

const berk_swash = Berkshire_Swash({
  variable: "--font-berk-shwash",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pretty Polaroid | Create and Share Polaroid-Style Photos",
  description: "Create stunning polaroid-style photos with Pretty Polaroid. Click your images, customize them with stickers and captions, and share your creations with friends and family. Experience the nostalgia of instant photography in a modern way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${berk_swash.variable} ${berk_swash.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme='pink' enableSystem disableTransitionOnChange>
          <PhotoProvider>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
        </PhotoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
