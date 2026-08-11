import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Click Pictures',
  description: 'Take pictures for the selected shots, re-take if you wish.'
};

export default function CameraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children
}