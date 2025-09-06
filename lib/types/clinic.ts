import { LocalizedString } from './common';
import { DoctorType } from './doctor';
import { DaySchedule } from './workingHours';
import { Types } from 'mongoose';

// Updated ClinicType to match Google Places API structure
export interface ClinicType {
  _id: string;
  
  // Basic information (from Google Places API)
  name?: string; // displayName.text from Places API
  displayName?: {
    text: string;
    languageCode?: string;
  };
  
  // Google Places API specific fields
  googlePlaceId?: string; // place_id from Places API
  types?: string[]; // place types from Places API
  businessStatus?: string; // OPERATIONAL, CLOSED_TEMPORARILY, etc.
  
  // Address information
  formattedAddress?: string; // formatted_address from Places API
  addressComponents?: {
    longName: string;
    shortName: string;
    types: string[];
  }[];
  
  // Location information
  location?: {
    latitude?: number; // geometry.location.lat
    longitude?: number; // geometry.location.lng
  };
  
  // Contact information (from Google Places API)
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  website?: string;
  
  // Business information
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number; // 0-4 scale
  
  // Opening hours
  openingHours?: {
    openNow?: boolean;
    periods?: {
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }[];
    weekdayText?: string[];
  };
  
  // Photos
  photos?: {
    name: string;
    widthPx: number;
    heightPx: number;
    authorAttributions?: {
      displayName: string;
      uri?: string;
      photoUri?: string;
    }[];
  }[];
  
  // Reviews
  reviews?: {
    name: string;
    relativePublishTimeDescription: string;
    rating: number;
    text: {
      text: string;
      languageCode: string;
    };
    originalText?: {
      text: string;
      languageCode: string;
    };
    authorAttribution: {
      displayName: string;
      uri?: string;
      photoUri?: string;
    };
    publishTime: string;
  }[];
  
  // Additional Google Places fields
  editorialSummary?: {
    text: string;
    languageCode: string;
  };
  
  // Legacy fields (for backward compatibility)
  pin?: string;
  license?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: LocalizedString;
  address?: LocalizedString;
  
  // Clinic metadata
  isActive?: boolean;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  
  // App-specific fields
  doctors?: string[]; // Array of doctor IDs
  doctorAssociations?: {
    doctorId: string;
    workingHours: DaySchedule[];
    isActive: boolean;
    joinedDate?: Date;
    notes?: string;
  }[];

  // Google Maps integration
  googleMapsUri?: string;
  googleMapsLinks?: {
    placeUri?: string;
    directionsUri?: string;
    reviewsUri?: string;
    photosUri?: string;
    writeReviewUri?: string;
  };
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  
  // Add this new field
  operations?: Types.ObjectId[];
}

// Simplified interface for creating clinics from Google Places
export interface GooglePlaceClinic {
  googlePlaceId: string;
  name: string;
  formattedAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  website?: string;
  rating?: number;
  userRatingsTotal?: number;
  types?: string[];
  businessStatus?: string;
  googleMapsUri?: string;
  doctors?: string[];
}