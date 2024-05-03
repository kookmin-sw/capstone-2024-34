import type { Metadata } from "next";
import localFont from "next/font/local";

import "@styles/common/globals.css";
import PrelineScript from "@components/common/prelinescript";

export const metadata: Metadata = {
  title: "InfoSec Platform",
  description: "KMU InfoSec portal",
};

const suit = localFont({
  src: "./fonts/SUIT-Variable.woff2",
  display: "swap",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${suit.className} w-full`}>
        {children}
        <PrelineScript />
      </body>
    </html>
  );
}
