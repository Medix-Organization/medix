import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DoctorOnboardingForm from '@/app/components/onboarding/DoctorOnboardingForm'

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DoctorOnboardingPage({ params }: PageProps) {
  const { userId } = await auth()
  const { locale } = await params
  
  if (!userId) {
    redirect(`/${locale}/sign-in`)
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Doctor Registration
          </h1>
          <p className="text-gray-600">
            Please provide your professional information to complete your doctor profile.
          </p>
        </div>
        
        <DoctorOnboardingForm locale={locale} />
      </div>
    </div>
  )
}