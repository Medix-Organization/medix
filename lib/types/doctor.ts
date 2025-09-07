import { LocalizedString } from './common';
import { ClinicType } from './clinic';
import { ReviewSummary } from './review';
import { ClinicAssociation } from './workingHours';

export interface DoctorType {
  _id: string;
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
  
  clinicAssociations?: ClinicAssociation[];
  
  shortBio: LocalizedString;
  subspecialties: LocalizedString[];
  devicesMaterials: string[];
  reviews: ReviewSummary;
  
  // Location section completely removed

  socialLinks: {
    linkedin?: string;
    instagram?: string;
    x?: string;
    snapchat?: string;
    researchGate?: string;
    clinicWebsite?: string;
  };
  
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