'use server';

import { Doctor } from '../models/doctorModel';
import { currentUser } from '@clerk/nextjs/server';
import { LocalizedString } from '../types/common';
import { redirect } from 'next/navigation';
import connectToDatabase from '../database';

interface CreateDoctorData {
  fullName: LocalizedString;
  specialty: LocalizedString;
  shortBio?: LocalizedString;
  phoneNumber?: string;
  yearsOfExperience: string;
  licenseNumber?: string;
  consultationFee?: number;
  availableForOnlineConsultation: boolean;
  location?: {
    googleMapLink: string;
  };
  languages?: string[];
  titleCredentials?: string[];
}

export async function createDoctorUser(formData: CreateDoctorData, locale: string) {
  try {
    // Get current user from Clerk
    const user = await currentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Connect to database
    await connectToDatabase();

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ 
      $or: [
        { email: user.emailAddresses[0]?.emailAddress },
        { clerkId: user.id }
      ]
    });

    if (existingDoctor) {
      throw new Error('Doctor profile already exists');
    }

    // Create doctor document
    const doctorData = {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      fullName: formData.fullName,
      specialty: formData.specialty,
      shortBio: formData.shortBio || { translations: { en: '', ar: '' } },
      phoneNumber: formData.phoneNumber,
      yearsOfExperience: formData.yearsOfExperience,
      licenseNumber: formData.licenseNumber,
      consultationFee: formData.consultationFee,
      availableForOnlineConsultation: formData.availableForOnlineConsultation,
      location: formData.location || { googleMapLink: '' },
      languages: formData.languages || [],
      titleCredentials: formData.titleCredentials || [],
      profileImage: user.imageUrl,
      isVerified: false,
      numberOfReviews: 0,
      pageVisits: 0,
      clinicAssociations: [],
      subspecialties: [],
      devicesMaterials: [],
      reviews: {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        }
      },
      socialLinks: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const doctor = new Doctor(doctorData);
    await doctor.save();

    console.log('Doctor created successfully:', doctor._id);
    
    // Redirect to doctor profile after successful creation
    redirect(`/${locale}/doctor-profile`);
  } catch (error) {
    console.error('Error creating doctor user:', error);
    throw error;
  }
}

export async function getDoctorByClerkId(clerkId: string) {
  try {
    await connectToDatabase();
    const doctor = await Doctor.findOne({ clerkId });
    return doctor;
  } catch (error) {
    console.error('Error fetching doctor by Clerk ID:', error);
    throw error;
  }
}

export async function updateDoctorProfile(clerkId: string, updateData: Partial<CreateDoctorData>) {
  try {
    await connectToDatabase();
    const doctor = await Doctor.findOneAndUpdate(
      { clerkId },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );
    return doctor;
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    throw error;
  }
}