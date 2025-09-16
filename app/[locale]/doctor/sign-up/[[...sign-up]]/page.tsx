import { SignUp } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

interface DoctorSignUpPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DoctorSignUpPage({ params }: DoctorSignUpPageProps) {
  // const t = await getTranslations('auth');
  const { locale } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('doctorSignUp') || 'Doctor Sign Up'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('doctorSignUpDescription') || 'Join our network of healthcare professionals'}
          </p> */}
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-sm normal-case',
            },
          }}
          unsafeMetadata={{
            role: 'doctor'
          }}
          redirectUrl={`/${locale}/doctor-onboarding`}
          afterSignUpUrl={`/${locale}/doctor-onboarding`}
          routing="path"
          path={`/${locale}/doctor/sign-up`}
          signInUrl={`/${locale}/sign-in`}
        />
      </div>
    </div>
  );
}