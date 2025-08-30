import { LocalizedString } from './common';
import { DoctorType } from './doctor';

export interface ClinicType {
  _id: string;
  name: LocalizedString;
  address: LocalizedString;
  pin: string;
  
  // Location information
  location: {
    googleMapLink: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  // Contact information
  contactEmail: string;
  contactPhone: string;
  description?: LocalizedString;
  
  // Clinic metadata
  isActive: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  
  // Virtual field for associated doctors
  doctors?: DoctorType[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}