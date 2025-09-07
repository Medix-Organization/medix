import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "Doctor Invite - Medix",
  description: "Join our network of healthcare professionals",
};

export default async function DoctorInviteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Load messages for the doctor-invite section
  const messages = (await import(`../../../../messages/${locale}.json`)).default;

  return (
    <ClerkProvider localization={locale === 'ar' ? arSA : undefined}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <div className="flex flex-col h-full">
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
        </div>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}