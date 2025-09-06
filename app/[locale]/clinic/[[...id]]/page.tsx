import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getClinicWithDoctors } from '@/lib/actions/getClinicById';
import ClinicView from '@/app/components/clinic/ClinicView';
import { ClinicType } from '@/lib/types/clinic';

interface ClinicPageProps {
  params: Promise<{
    locale: string;
    id: string[];
  }>;
}

export default async function ClinicPage({ params }: ClinicPageProps) {
  const resolvedParams = await params;
  const clinicId = resolvedParams.id?.[0];
  
  if (!clinicId) {
    notFound();
  }

  let clinic: ClinicType | null = null;
  
  try {
    clinic = await getClinicWithDoctors(clinicId);
  } catch (error) {
    console.error('Error fetching clinic:', error);
    notFound();
  }

  if (!clinic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      }>
        <ClinicView clinic={clinic} locale={resolvedParams.locale} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: ClinicPageProps) {
  const resolvedParams = await params;
  const clinicId = resolvedParams.id?.[0];
  
  if (!clinicId) {
    return {
      title: 'Clinic Not Found',
    };
  }

  try {
    const clinic = await getClinicWithDoctors(clinicId);
    const clinicName = clinic?.displayName?.text || clinic?.name || 'Clinic';
    
    return {
      title: `${clinicName} - Medix`,
      description: clinic?.description?.translations?.en || `Visit ${clinicName} for quality healthcare services.`,
    };
  } catch (error) {
    return {
      title: 'Clinic Not Found',
    };
  }
}