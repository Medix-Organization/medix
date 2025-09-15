import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDoctorByClerkId } from '@/lib/actions/getDoctorById'

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DoctorSignInPage({ params }: PageProps) {
  const { locale } = await params;
  
  // Check if user is already signed in
  const { userId } = await auth();
  if (userId) {
    // Check if doctor profile exists
    try {
      const doctor = await getDoctorByClerkId(userId);
      if (doctor) {
        redirect(`/${locale}/doctor-profile/${doctor._id}`);
      } else {
        redirect(`/${locale}/doctor-onboarding`);
      }
    } catch (error) {
      redirect(`/${locale}/doctor-onboarding`);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Doctor Sign In</h2>
          <p className="mt-2 text-gray-600">Sign in to your doctor account</p>
        </div>
        <SignIn 
          afterSignInUrl={`/${locale}/dashboard?role=doctor`}
          redirectUrl={`/${locale}/dashboard?role=doctor`}
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border-0",
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700'
            }
          }}
        />
      </div>
    </div>
  )
}