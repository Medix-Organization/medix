import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import PatientOnboardingForm from '@/app/components/onboarding/PatientOnboardingForm'
import DoctorOnboardingForm from '@/app/components/onboarding/DoctorOnboardingForm'

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ role?: string }>;
}

export default async function OnboardingPage({ params, searchParams }: PageProps) {
  const { userId } = await auth()
  const { locale } = await params
  const { role } = await searchParams
  
  if (!userId) {
    redirect(`/${locale}/sign-in`)
  }
  
  const userRole = role || 'patient' // Default to patient if no role specified
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Registration
          </h1>
          <p className="text-gray-600">
            {userRole === 'doctor' 
              ? 'Please provide your professional information to complete your doctor profile.'
              : 'Please provide your information to complete your patient profile.'
            }
          </p>
        </div>
        
        {userRole === 'doctor' ? (
          <DoctorOnboardingForm locale={locale} />
        ) : (
          <PatientOnboardingForm locale={locale} />
        )}
      </div>
    </div>
  )
}