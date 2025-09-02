import { LocalizedString } from './common';
import { ClinicType } from './clinic';
import { ReviewSummary } from './review';
import { ClinicAssociation } from './workingHours';

// Remove extends Document - this is now a plain interface
export interface DoctorType {
  _id: string; // Change from Types.ObjectId to string
  clerkId: string;
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
  //clinic?: ClinicType;
  
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
  consultationFee?: number;
  availableForOnlineConsultation: boolean;
  profileImage?: string;
  coverImage?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  pageVisits: number;
}