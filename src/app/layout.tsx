import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "黒空文庫 - 禁断の小説墓場",
  description: "失われた文学作品と架空の作家たちが眠る、もう一つの文学史",
  keywords: ["小説", "文学", "青空文庫", "怪奇", "幻想"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
