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
    // Always redirect to dashboard with role parameter
    if (roleParam) {
      redirect(`/${locale}/dashboard?role=${roleParam}`);
    } else {
      redirect(`/${locale}/dashboard`);
    }
  }

  // Set redirect URL to dashboard with role parameter
  const redirectUrl = roleParam ? `/${locale}/dashboard?role=${roleParam}` : `/${locale}/dashboard`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {roleParam === 'doctor' ? 'Doctor Sign In' : 
             roleParam === 'clinic' ? 'Clinic Sign In' : 
             'Sign In'}
          </h2>
          <p className="mt-2 text-gray-600">
            {roleParam === 'doctor' ? 'Sign in to your doctor account' : 
             roleParam === 'clinic' ? 'Sign in to your clinic account' : 
             'Sign in to your account'}
          </p>
        </div>
        <SignIn 
          afterSignInUrl={redirectUrl}
          redirectUrl={redirectUrl}
        />
      </div>
    </div>
  );
}