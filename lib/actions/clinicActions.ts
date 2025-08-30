'use server';

import connectToDatabase from '../database';
import { Clinic } from '../models/clinicModel';
import { ClinicType } from '../types/clinic';

// Updated interface to match the new ClinicType structure
interface CreateClinicData {
  name?: string;
  pin?: string;
  license?: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  // FIXED: Update location to match locationSchema
  location?: {
    googleMapLink: string; // Required by locationSchema
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  // UPDATED: Change description to match schema structure
  description?: {
    translations?: {
      en?: string;
      ar?: string;
    };
  };
  // UPDATED: Add address with translations structure
  address?: {
    translations?: {
      en?: string;
      ar?: string;
    };
  };
  doctors?: string[];
  // Google Places API specific fields
  googlePlaceId?: string;
  types?: string[];
  businessStatus?: string;
  formattedAddress?: string;
  displayName?: {
    text?: string;
    languageCode?: string;
  };
  internationalPhoneNumber?: string;
  nationalPhoneNumber?: string;
  businessInfo?: {
    rating?: number;
    userRatingCount?: number;
    priceLevel?: number;
  };
  openingHours?: {
    openNow?: boolean;
    periods?: any[];
    weekdayDescriptions?: string[];
  };
  photos?: any[];
  reviews?: any[];
  websiteUri?: string;
  googleMapsUri?: string;
  regularOpeningHours?: any;
  currentOpeningHours?: any;
  currentSecondaryOpeningHours?: any[];
  regularSecondaryOpeningHours?: any[];
  editorialSummary?: {
    text?: string;
    languageCode?: string;
  };
  outdoorSeating?: boolean;
  liveMusic?: boolean;
  menuForChildren?: boolean;
  servesCocktails?: boolean;
  servesWine?: boolean;
  servesBeer?: boolean;
  reservable?: boolean;
  servesVegetarianFood?: boolean;
  // Legacy fields
  contactEmail?: string;
  contactPhone?: string;
  city?: string;
  // Additional schema fields
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  isActive?: boolean;
  verificationStatus?: string;
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
      $and: [
        {
          $or: [
            // New structure searches
            { name: { $regex: query, $options: 'i' } },
            { 'displayName.text': { $regex: query, $options: 'i' } },
            { formattedAddress: { $regex: query, $options: 'i' } },
            { 'location.address': { $regex: query, $options: 'i' } },
            { 'location.city': { $regex: query, $options: 'i' } },
            // Legacy structure searches for backward compatibility
            { 'name.translations.en': { $regex: query, $options: 'i' } },
            { 'name.translations.ar': { $regex: query, $options: 'i' } },
            { 'address.translations.en': { $regex: query, $options: 'i' } },
            { 'address.translations.ar': { $regex: query, $options: 'i' } }
          ]
        },
        {
          $or: [
            { isActive: true },
            { isActive: { $exists: false } } // For new clinics without isActive field
          ]
        }
      ]
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
    
    const clinics = await Clinic.find({
      $or: [
        { isActive: true },
        { isActive: { $exists: false } } // For new clinics without isActive field
      ]
    })
    .sort({ name: 1 }) // Simplified sorting - MongoDB will handle both new and legacy structures
    .lean()
    .exec();
    
    return JSON.parse(JSON.stringify(clinics));
  } catch (error) {
    console.error('Error fetching clinics:', error);
    throw new Error('Failed to fetch clinics');
  }
}