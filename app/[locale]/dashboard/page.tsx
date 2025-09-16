import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDoctorByClerkId } from '@/lib/actions/getDoctorById';
import { getClinicByClerkId } from '@/lib/actions/getClinicById';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const { userId } = await auth();
  
  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }

  try {
    // Get the user from Clerk to access their role
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const userRole = user.publicMetadata?.role as string;
    
    // Role-based redirection based on Clerk roles
    switch(userRole) {
      case 'doctor':
        const doctor = await getDoctorByClerkId(userId);
        if (doctor) {
          redirect(`/${locale}/doctor-profile/${doctor._id}`);
        } else {
          redirect(`/${locale}/doctor-onboarding`);
        }
        break;
        
      case 'clinic':
        const clinic = await getClinicByClerkId(userId);
        if (clinic) {
          redirect(`/${locale}/clinic/${clinic._id}`);
        } else {
          redirect(`/${locale}/clinic-onboarding`);
        }
        break;
        
      case 'admin':
        redirect(`/${locale}/admin`);
        break;
        
      case 'patient':
      default:
        redirect(`/${locale}/home`);
    }
  } catch (error) {
    console.error('Error during role-based redirection:', error);
    redirect(`/${locale}/home`);
  }
}