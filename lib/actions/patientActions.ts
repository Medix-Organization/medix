'use server';

import { currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '../database';
import Patient from '../models/patientModel';
import { Patient as PatientType } from '../types/patient';

/**
 * Get patient by Clerk ID
 * @param clerkId - The Clerk user ID
 * @returns Patient data or null if not found
 */
export async function getPatientByClerkId(clerkId: string): Promise<PatientType | null> {
  try {
    await connectToDatabase();
    
    const patient = await Patient.findOne({ clerkId }).lean().exec();
    
    if (!patient) {
      return null;
    }
    
    return JSON.parse(JSON.stringify(patient));
  } catch (error) {
    console.error('Error fetching patient by clerkId:', error);
    throw new Error('Failed to fetch patient profile');
  }
}

/**
 * Get current authenticated patient's profile
 * @returns Current patient's data or null if not found
 */
export async function getCurrentPatient(): Promise<PatientType | null> {
  try {
    const user = await currentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    return await getPatientByClerkId(user.id);
  } catch (error) {
    console.error('Error fetching current patient:', error);
    throw new Error('Failed to fetch current patient profile');
  }
}

/**
 * Create a new patient profile
 * @param patientData - Patient data to create
 * @returns Created patient data
 */
export async function createPatient(patientData: {
  fullName: string;
  age?: number;
  gender?: 'male' | 'female';
}): Promise<PatientType> {
  try {
    const user = await currentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    await connectToDatabase();

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ 
      $or: [
        { email: user.emailAddresses[0]?.emailAddress },
        { clerkId: user.id }
      ]
    });

    if (existingPatient) {
      throw new Error('Patient profile already exists');
    }

    const newPatient = new Patient({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      fullName: patientData.fullName,
      age: patientData.age,
      gender: patientData.gender,
      // Note: password field exists in schema but not used with Clerk auth
      password: 'clerk_managed'
    });

    await newPatient.save();
    
    return JSON.parse(JSON.stringify(newPatient));
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
}