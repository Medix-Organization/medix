import { Document, Types } from 'mongoose';
import { LocalizedString } from './common';
import { Clinic } from './clinic';
import { ReviewSummary } from './review';
import { ClinicAssociation } from './workingHours';

export interface Doctor extends Document {
  fullName: LocalizedString;
  specialty: LocalizedString;
  titleCredentials: string[];
  yearsOfExperience: string; 
  languages: string[];
  licenseNumber?: string;
  certificationsFellowships?: string[];
  memberships?: string[];
  awards?: string[];
  numberOfReviews: number;
  
  // Updated: Multiple clinic associations with working hours
  clinicAssociations: ClinicAssociation[];
  
  // Deprecated: Keep for backward compatibility, but mark as optional
  clinic?: Clinic;
  
  shortBio: LocalizedString;
  subspecialties: LocalizedString[];
  devicesMaterials: string[];
  reviews: ReviewSummary;
  
  // Location & Map
  location: {
    googleMapLink: string;
  };

  // Social Media & Professional Links
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    x?: string;
    snapchat?: string;
    researchGate?: string;
    clinicWebsite?: string;
  };
  
  // Additional fields
  email: string;
  phoneNumber?: string;
  
  // Deprecated: Remove workingHours as it's now part of clinicAssociations
  // workingHours?: string;
  
  consultationFee?: number;
  availableForOnlineConsultation: boolean;
  profileImage?: string;
  coverImage?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  pageVisits: number;
}