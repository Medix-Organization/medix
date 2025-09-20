import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDoctorByClerkId } from '@/lib/actions/getDoctorById';
import { getClinicByClerkId } from '@/lib/actions/getClinicById';
import { getPatientByClerkId } from '@/lib/actions/patientActions';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  console.log('🚀 Dashboard page started');
  
  const { locale } = await params;
  console.log('🌍 Locale:', locale);
  
  const user = await currentUser();
  console.log('👤 Current user:', {
    id: user?.id,
    email: user?.emailAddresses?.[0]?.emailAddress,
    publicMetadata: user?.publicMetadata
  });
  
  if (!user) {
    console.log('❌ No user found, redirecting to sign-in');
    redirect(`/${locale}/sign-in`);
  }

  // Access role from unsafeMetadata (keeping your line 30 as requested)
  const userRole = user.unsafeMetadata.role as string;
  
  console.log('🎭 User role from unsafeMetadata:', userRole);
  console.log('🆔 User ID:', user.id);
  console.log('📋 Full unsafeMetadata:', user.unsafeMetadata);
  
  // Role-based redirection based on Clerk roles
  switch(userRole) {
    case 'doctor':
      console.log('👨‍⚕️ Processing doctor role...');
      
      console.log('🔍 Calling getDoctorByClerkId with userId:', user.id);
      const doctor = await getDoctorByClerkId(user.id);
      console.log('📊 getDoctorByClerkId result:', {
        found: !!doctor,
        doctorId: doctor?._id,
        doctorData: doctor ? 'Doctor object exists' : 'No doctor data'
      });
      
      if (doctor) {
        console.log('✅ Doctor profile found, redirecting to profile:', doctor._id);
        redirect(`/${locale}/doctor-profile/${doctor._id}`);
      } else {
        console.log('⚠️ No doctor profile found, redirecting to onboarding');
        redirect(`/${locale}/doctor-onboarding`);
      }
      break;
      
    case 'clinic':
      console.log('🏥 Processing clinic role...');
      
      console.log('🔍 Calling getClinicByClerkId with userId:', user.id);
      const clinic = await getClinicByClerkId(user.id);
      console.log('📊 getClinicByClerkId result:', {
        found: !!clinic,
        clinicId: clinic?._id,
        clinicData: clinic ? 'Clinic object exists' : 'No clinic data'
      });
      
      if (clinic) {
        console.log('✅ Clinic profile found, redirecting to profile:', clinic._id);
        redirect(`/${locale}/clinic/${clinic._id}`);
      } else {
        console.log('⚠️ No clinic profile found, redirecting to onboarding');
        redirect(`/${locale}/clinic-onboarding`);
      }
      break;
      
    case 'admin':
      console.log('👑 Processing admin role, redirecting to admin panel');
      redirect(`/${locale}/admin`);
      break;
      
    case 'patient':
    default:
      console.log('👤 Processing patient/default role (user with no role is considered patient)...');
      
      console.log('🔍 Calling getPatientByClerkId with userId:', user.id);
      const patient = await getPatientByClerkId(user.id);
      console.log('📊 getPatientByClerkId result:', {
        found: !!patient,
        patientId: patient?._id,
        patientData: patient ? 'Patient object exists' : 'No patient data'
      });
      
      if (patient) {
        console.log('✅ Patient profile found, redirecting to home');
        redirect(`/${locale}/home`);
      } else {
        console.log('⚠️ No patient profile found, redirecting to patient onboarding');
        redirect(`/${locale}/onboarding`);
      }
      break;
  }
}