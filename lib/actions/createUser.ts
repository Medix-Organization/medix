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
  // location field removed from interface
  languages?: string[];
  titleCredentials?: string[];
}

export async function createDoctorUser(formData: CreateDoctorData, locale: string) {
  try {
    const user = await currentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    await connectToDatabase();

    const existingDoctor = await Doctor.findOne({ 
      $or: [
        { email: user.emailAddresses[0]?.emailAddress },
        { clerkId: user.id }
      ]
    });

    if (existingDoctor) {
      throw new Error('Doctor profile already exists');
    }

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
      // location field removed from doctorData
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
    
    // Convert the doctor document to a plain object before returning
    const plainDoctor = doctor.toObject ? doctor.toObject() : JSON.parse(JSON.stringify(doctor));
    
    return plainDoctor; // Return the plain object instead of the Mongoose document
  } catch (error) {
    console.error('Error creating doctor user:', error);
    throw error;
  }
}

export async function getDoctorByClerkId(clerkId: string) {
  try {
    await connectToDatabase();
    const doctor = await Doctor.findOne({ clerkId });
    
    // Convert to plain object before returning
    return doctor ? (doctor.toObject ? doctor.toObject() : JSON.parse(JSON.stringify(doctor))) : null;
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
    
    // Convert to plain object before returning
    return doctor ? (doctor.toObject ? doctor.toObject() : JSON.parse(JSON.stringify(doctor))) : null;
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    throw error;
  }
}