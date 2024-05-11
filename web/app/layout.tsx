import type { Metadata } from "next";
import localFont from "next/font/local";

import "@styles/common/globals.css";
import PrelineScript from "@components/common/prelinescript";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import koKR from "antd/lib/locale/ko_KR";

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
      <body className={`${suit.className}`}>
        <AntdRegistry>
          <ConfigProvider locale={koKR}>
            {children}
            <PrelineScript />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
