import { Schema, models, model } from 'mongoose';
import { localizedStringSchema } from '../schemas/localizedString';
import { reviewSummarySchema } from './reviewModel';

import { socialLinksSchema } from './socialLinksModel';
import { clinicAssociationSchema } from './clinicAssociationModel';
import type { DoctorType } from '../types/doctor';

// Force clear any cached model


const DoctorSchema = new Schema<DoctorType>({
  clerkId: { type: String, required: true, unique: true },
  fullName: { type: localizedStringSchema, required: true },
  specialty: { type: localizedStringSchema, required: true },
  titleCredentials: { type: [String], default: [] },
  yearsOfExperience: { type: String, required: true },
  languages: { type: [String], default: [] },
  licenseNumber: { type: String },
  certificationsFellowships: { type: [String], default: [] },
  memberships: { type: [String], default: [] },
  awards: { type: [String], default: [] },
  numberOfReviews: { type: Number, default: 0 },
  shortBio: { type: localizedStringSchema },
  subspecialties: { type: [localizedStringSchema], default: [] },
  devicesMaterials: { type: [String], default: [] },
  reviews: { type: reviewSummarySchema, default: () => ({}) },
  // location field completely removed
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  consultationFee: { type: Number },
  availableForOnlineConsultation: { type: Boolean, default: false },
  profileImage: { type: String },
  coverImage: { type: String },
  isVerified: { type: Boolean, default: false },
  socialLinks: { type: socialLinksSchema, default: () => ({}) },
  pageVisits: { type: Number, default: 0 },
  
  clinicAssociations: {
    type: [clinicAssociationSchema],
    default: [],
    validate: {
      validator: function(associations: any[]) {
        const clinicIds = associations.map(assoc => assoc.clinicId.toString());
        return clinicIds.length === new Set(clinicIds).size;
      },
      message: 'Duplicate clinic associations are not allowed'
    }
  }
}, {
  timestamps: true
});

export const Doctor = models?.Doctor || model<DoctorType>('Doctor', DoctorSchema);