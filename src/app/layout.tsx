import type { Metadata } from "next";
import Providers from "@/components/Providers";
import { AppBar } from "@/components";

import "./globals.css";
import { LoadingContainer } from "@/containers";

export const metadata: Metadata = {
  title: "Тестовое задание",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>
          <AppBar />
          <LoadingContainer>{children}</LoadingContainer>
        </Providers>
      </body>
    </html>
  );
}
