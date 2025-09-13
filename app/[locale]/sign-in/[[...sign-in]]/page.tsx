import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ role?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const searchParamsResolved = await searchParams;
  const roleParam = searchParamsResolved?.role;
  
  // Check if user is already signed in
  const { userId } = await auth();
  if (userId) {
    // If already signed in, redirect based on role
    redirect(`/${locale}/dashboard`);
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-8">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border-0",
            }
          }}
          afterSignInUrl={`/${locale}/dashboard`}
          redirectUrl={`/${locale}/dashboard`}
        />
      </div>
    </div>
  )
}