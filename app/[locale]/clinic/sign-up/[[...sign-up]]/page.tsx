import { SignUp } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

interface ClinicSignUpPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ClinicSignUpPage({ params }: ClinicSignUpPageProps) {
  const t = await getTranslations('auth');
  const { locale } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('clinicSignUp') || 'Clinic Sign Up'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('clinicSignUpDescription') || 'Register your clinic on our platform'}
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-sm normal-case',
            },
          }}
          unsafeMetadata={{
            role: 'clinic'
          }}
          redirectUrl={`/${locale}/clinic-onboarding`}
          afterSignUpUrl={`/${locale}/clinic-onboarding`}
          routing="path"
          path={`/${locale}/clinic/sign-up`}
          signInUrl={`/${locale}/sign-in`}
          initialValues={{
            emailAddress: ''
          }}
        />
      </div>
    </div>
  );
}
