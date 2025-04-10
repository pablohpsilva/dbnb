import "./globals.css";

import type { Metadata } from "next";
import { APP_NAME } from "../constants";
import { Web3Provider } from "../lib/providers";

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    "Decentralized vacation rentals with Web3 authentication and crypto payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
