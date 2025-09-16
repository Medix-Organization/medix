import { SignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface SignInPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ role?: string }>;
}

export default async function SignInPage({ params, searchParams }: SignInPageProps) {
  const { locale } = await params;
  const { role } = await searchParams;
  const { userId } = await auth();
  
  // If user is already signed in, redirect to dashboard for role-based redirection
  if (userId) {
    redirect(`/${locale}/dashboard`);
  }

  // Set redirect URL to dashboard where role-based redirection will happen
  const redirectUrl = `/${locale}/dashboard`;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {role === 'doctor' ? 'Doctor Sign In' : role === 'clinic' ? 'Clinic Sign In' : 'Sign In'}
          </h2>
        </div>
        <SignIn 
          redirectUrl={redirectUrl}
          signUpUrl={`/${locale}/${role || 'patient'}/sign-up`}
        />
      </div>
    </div>
  );
}
