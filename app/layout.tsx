import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Disclosure } from "@headlessui/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Safeguard Sandbox",
  description:
    "A playground for experimenting with safety model's capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full bg-white dark:bg-gray-950 scheme-light dark:scheme-dark`}
    >
      <body className="h-full">
        <div className="min-h-full">
          <Disclosure
            as="nav"
            className="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-neutral-900"
          >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex shrink-0 items-center">
                    <span>Safeguard Sandbox</span>
                  </div>
                </div>
              </div>
            </div>
          </Disclosure>

          <div className="py-10">
            <main>
              <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
