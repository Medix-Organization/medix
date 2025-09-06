import { SignUp } from '@clerk/nextjs'

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ role?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { role } = await searchParams;
  
  const getRedirectUrl = () => {
    if (role === 'clinic') {
      return `/${locale}/clinic-onboarding`;
    }
    return `/${locale}/onboarding${role ? `?role=${role}` : ''}`;
  };
  
  const redirectUrl = getRedirectUrl();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blur-md py-12 px-4 sm:px-6 lg:px-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-8">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border-0",
            }
          }}
          forceRedirectUrl={redirectUrl}
          signInUrl={`/${locale}/sign-in`}
        />
      </div>
    </div>
  )
}