import ClinicOnboardingFlow from '@/app/components/onboarding/ClinicOnboardingFlow';

interface ClinicOnboardingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ClinicOnboardingPage({ params }: ClinicOnboardingPageProps) {
  const { locale } = await params;
  
  return <ClinicOnboardingFlow locale={locale} />;
}