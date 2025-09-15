'use server';

import connectToDatabase from '../database';
import { Clinic } from '../models/clinicModel';
import { Doctor } from '../models/doctorModel';
import { ClinicType } from '../types/clinic';

/**
 * Get clinic by Clerk ID
 * @param clerkId - The Clerk user ID
 * @returns Clinic data or null if not found
 */
export async function getClinicByClerkId(clerkId: string): Promise<ClinicType | null> {
  try {
    await connectToDatabase();
    
    const clinic = await Clinic.findOne({ clerkId }).lean().exec();
    
    if (!clinic) {
      return null;
    }
    
    return JSON.parse(JSON.stringify(clinic));
  } catch (error) {
    console.error('Error fetching clinic by clerkId:', error);
    throw new Error('Failed to fetch clinic profile');
  }
}

export async function getClinicWithDoctors(clinicId: string): Promise<ClinicType | null> {
  try {
    await connectToDatabase();
    
    const clinic = await Clinic.findById(clinicId)
      .populate({
        path: 'doctors',
        model : Doctor,
        select: 'fullName specialty yearsOfExperience profileImage isVerified'
      })
      .lean()
      .exec();
    
    if (!clinic) {
      return null;
    }
    
    return JSON.parse(JSON.stringify(clinic));
  } catch (error) {
    console.error('Error fetching clinic with doctors:', error);
    throw new Error('Failed to fetch clinic data');
  }
}