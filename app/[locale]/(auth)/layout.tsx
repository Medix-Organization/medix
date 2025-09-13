'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { NextIntlClientProvider } from "next-intl";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load messages for the client provider
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <ClerkProvider localization={locale === 'ar' ? arSA : undefined}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased h-full ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
          <main className="h-full">{children}</main>
        </div>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}