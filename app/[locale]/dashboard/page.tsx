import { getClinicByClerkId } from '@/lib/actions/getClinicById';
import { getDoctorByClerkId } from '@/lib/actions/getDoctorById';
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage({ 
  params,
  searchParams 
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ role?: string }>;
}) {
  const { userId } = await auth();
  const { locale } = await params;
  const searchParamsResolved = await searchParams;
  const roleParam = searchParamsResolved?.role;

  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }

  try {
    // Check if user has completed profile based on role hint
    if (roleParam === 'doctor') {
      const doctor = await getDoctorByClerkId(userId);
      if (doctor) {
        redirect(`/${locale}/doctor-profile/${doctor._id}`);
      } else {
        redirect(`/${locale}/doctor-onboarding`);
      }
    } else if (roleParam === 'clinic') {
      const clinic = await getClinicByClerkId(userId);
      if (clinic) {
        redirect(`/${locale}/clinic/${clinic._id}`);
      } else {
        redirect(`/${locale}/clinic-onboarding`);
      }
    }
    
    // If no role parameter, check both doctor and clinic
    const [doctor, clinic] = await Promise.allSettled([
      getDoctorByClerkId(userId),
      getClinicByClerkId(userId)
    ]);

    if (doctor.status === 'fulfilled' && doctor.value) {
      redirect(`/${locale}/doctor-profile/${doctor.value._id}`);
    }
    
    if (clinic.status === 'fulfilled' && clinic.value) {
      redirect(`/${locale}/clinic/${clinic.value._id}`);
    }
    
    // If no profile found, redirect to general onboarding
    redirect(`/${locale}/onboarding`);
    
  } catch (error) {
    console.error('Dashboard redirect error:', error);
    redirect(`/${locale}/onboarding`);
  }
}