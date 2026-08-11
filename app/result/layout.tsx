import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Get Polaroid',
  description: 'Your Polaroid is generated. Customise it with texts and theme-based stickers curated for your aesthetics. Save and share it with your friends.'
};

export default function CameraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children
}