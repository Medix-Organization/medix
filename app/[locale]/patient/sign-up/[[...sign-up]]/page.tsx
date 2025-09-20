import { SignUp } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

interface PatientSignUpPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PatientSignUpPage({ params }: PatientSignUpPageProps) {
  // const t = await getTranslations('auth');
  const { locale } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('patientSignUp') || 'Patient Sign Up'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('patientSignUpDescription') || 'Create your patient account'}
          </p>
        </div> */}
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
            },
          }}
          unsafeMetadata={{
            role: 'patient'
          }}
          redirectUrl={`/${locale}/onboarding`}
          afterSignUpUrl={`/${locale}/onboarding`}
          routing="path"
          path={`/${locale}/patient/sign-up`}
          signInUrl={`/${locale}/sign-in`}
        />
      </div>
    </div>
  );
}