import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { userId } = await auth();
  const { locale } = await params;
  
  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  // Redirect based on user role
  switch (role) {
    case 'doctor':
      redirect(`/${locale}/doctor-onboarding`);
    case 'clinic':
      redirect(`/${locale}/clinic-onboarding`);
    case 'patient':
      redirect(`/${locale}/onboarding`);
    case 'admin':
      redirect(`/${locale}/admin`);
    default:
      // If no role is set, default to patient onboarding
      redirect(`/${locale}/onboarding`);
  }
}