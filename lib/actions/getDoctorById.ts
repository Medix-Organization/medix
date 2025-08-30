'use server'

import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '../database';
import { DoctorType } from '../types/doctor';
import { Doctor } from '../models/doctorModel';

/**
 * Get doctor by Clerk ID
 * @param clerkId - The Clerk user ID
 * @returns Doctor data or null if not found
 */
export async function getDoctorByClerkId(clerkId: string): Promise<DoctorType | null> {
  try {
    await connectToDatabase();
    
    const doctor = await Doctor.findOne({ clerkId }).lean().exec();
    const doctorToObj = JSON.parse(JSON.stringify(doctor));
    if (!doctorToObj) {
      return null;
    }

    // Convert MongoDB _id to string
    return doctorToObj;
  } catch (error) {
    console.error('Error fetching doctor by clerkId:', error);
    throw new Error('Failed to fetch doctor profile');
  }
}

/**
 * Get current authenticated doctor's profile
 * @returns Current doctor's data or null if not found
 */
export async function getCurrentDoctor(): Promise<DoctorType | null> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error('User not authenticated');
    }

    return await getDoctorByClerkId(userId);
  } catch (error) {
    console.error('Error fetching current doctor:', error);
    throw new Error('Failed to fetch current doctor profile');
  }
}

/**
 * Get doctor by MongoDB ObjectId (for internal use)
 * @param id - MongoDB ObjectId as string
 * @returns Doctor data or null if not found
 */
export async function getDoctorByMongoId(id: string): Promise<DoctorType | null> {
  try {
    await connectToDatabase();
    
    const doctor = await Doctor.findById(id).lean();
    
    if (!doctor) {
      return null;
    }

    // Convert MongoDB _id to string and remove Mongoose-specific fields
    const doctorToObj = JSON.parse(JSON.stringify(doctor));
    return doctorToObj;
  } catch (error) {
    console.error('Error fetching doctor by MongoDB ID:', error);
    throw new Error('Failed to fetch doctor profile');
  }
}