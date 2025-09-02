'use server';

import connectToDatabase from '../database';
import { Clinic } from '../models/clinicModel';
import {  ClinicType } from '../types/clinic';

export async function getClinicWithDoctors(clinicId: string): Promise<ClinicType | null> {
  try {
    await connectToDatabase();
    
    const clinic = await Clinic.findById(clinicId)
      .populate({
        path: 'doctors',
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