import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat App",
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional: choose weights you use
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={inter.className}>{children}</div>;
}
