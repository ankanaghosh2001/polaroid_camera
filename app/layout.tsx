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
  title: {
    default: "Pretty Polaroid | Create and Share Polaroid-Style Photos",
    template: '%s | Pretty Polaroid'
  },
  description: "Create stunning polaroid-style photos with Pretty Polaroid. Click your images, customize them with stickers and captions, and share your creations with friends and family. Experience the nostalgia of instant photography in a modern way!",
  authors: [{name: 'Ankana Ghosh', url: 'https://ankana-ghosh.vercel.app'}],
  keywords: ['Polaroid Images', 'Click Polaroid Images', 'Aesthetic Polaroids', 'digital Polaroid generator', 'create Polaroid photos online', 'digital photo booth', 'online photo booth', 'online Polaroid maker', 'free online photo booth', 'custom Polaroid maker'],
  openGraph: {
    url: 'https://pretty-polaroid.vercel.app',
    siteName: 'Pretty Polaroid',
    type: 'website',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 720,
        alt: 'Pretty Polaroid Website Banner'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
