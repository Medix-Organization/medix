import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getClinicByClerkId } from '@/lib/actions/getClinicById'

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ClinicSignInPage({ params }: PageProps) {
  const { locale } = await params;
  
  // Check if user is already signed in
  const { userId } = await auth();
  if (userId) {
    // Check if clinic profile exists
    try {
      const clinic = await getClinicByClerkId(userId);
      if (clinic) {
        redirect(`/${locale}/clinic/${clinic._id}`);
      } else {
        redirect(`/${locale}/clinic-onboarding`);
      }
    } catch (error) {
      redirect(`/${locale}/clinic-onboarding`);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Clinic Sign In</h2>
          <p className="mt-2 text-gray-600">Sign in to your clinic account</p>
        </div>
        <SignIn 
          afterSignInUrl={`/${locale}/dashboard?role=clinic`}
          redirectUrl={`/${locale}/dashboard?role=clinic`}
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border-0",
              formButtonPrimary: 'bg-green-600 hover:bg-green-700'
            }
          }}
        />
      </div>
    </div>
  )
}