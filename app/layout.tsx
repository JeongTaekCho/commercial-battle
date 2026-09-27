import type { Metadata } from "next";
import "./globals.css";
import RootLayoutProvider from "@/app/RootLayoutProvider";
import Header from "@/src/shared/components/Header";

export const metadata: Metadata = {
  title: "상권배틀 | 내 가게의 다음 자리",
  description: "상권의 흐름을 읽고, 내 가게의 다음 자리를 찾아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RootLayoutProvider>
          <Header />
          {children}
        </RootLayoutProvider>
      </body>
    </html>
  );
}
