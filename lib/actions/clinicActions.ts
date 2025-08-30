'use server';

import connectToDatabase from '../database';
import { Clinic } from '../models/clinicModel';
import { ClinicType } from '../types/clinic';
import { LocalizedString } from '../types/common';

interface CreateClinicData {
  name: LocalizedString;
  address: LocalizedString;
  pin: string;
  location: {
    googleMapLink: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contactEmail: string;
  contactPhone: string;
  description?: LocalizedString;
}

export async function createClinic(clinicData: CreateClinicData): Promise<ClinicType> {
  try {
    await connectToDatabase();
    
    const clinic = new Clinic(clinicData);
    const savedClinic = await clinic.save();
    
    return JSON.parse(JSON.stringify(savedClinic));
  } catch (error) {
    console.error('Error creating clinic:', error);
    throw new Error('Failed to create clinic');
  }
}

export async function searchClinics(query: string): Promise<ClinicType[]> {
  try {
    await connectToDatabase();
    
    const clinics = await Clinic.find({
      $or: [
        { 'name.translations.en': { $regex: query, $options: 'i' } },
        { 'name.translations.ar': { $regex: query, $options: 'i' } },
        { 'address.translations.en': { $regex: query, $options: 'i' } },
        { 'address.translations.ar': { $regex: query, $options: 'i' } }
      ],
      isActive: true
    })
    .limit(10)
    .lean()
    .exec();
    
    return JSON.parse(JSON.stringify(clinics));
  } catch (error) {
    console.error('Error searching clinics:', error);
    throw new Error('Failed to search clinics');
  }
}

export async function getAllClinics(): Promise<ClinicType[]> {
  try {
    await connectToDatabase();
    
    const clinics = await Clinic.find({ isActive: true })
      .sort({ 'name.translations.en': 1 })
      .lean()
      .exec();
    
    return JSON.parse(JSON.stringify(clinics));
  } catch (error) {
    console.error('Error fetching clinics:', error);
    throw new Error('Failed to fetch clinics');
  }
}