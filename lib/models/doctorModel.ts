import { Schema, models, model } from 'mongoose';
import type { Doctor } from '../types/doctor';
import { localizedStringSchema } from '../schemas/localizedString';
import { reviewSummarySchema } from './reviewModel';
import { socialLinksSchema } from './socialLinksModel';
import { locationSchema } from './locationModel';
import { clinicAssociationSchema } from './clinicAssociationModel'; // Updated import

const DoctorSchema = new Schema<Doctor>({
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
  clinic: { type: Schema.Types.ObjectId, ref: 'Clinic' },
  shortBio: { type: localizedStringSchema },
  subspecialties: { type: [localizedStringSchema], default: [] },
  devicesMaterials: { type: [String], default: [] },
  reviews: { type: reviewSummarySchema, default: () => ({}) },
  location: { type: locationSchema, required: true },
   email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  consultationFee: { type: Number },
  availableForOnlineConsultation: { type: Boolean, default: false },
  profileImage: { type: String },
  coverImage: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  pageVisits: { type: Number, default: 0 },
  socialLinks: { type: socialLinksSchema, default: () => ({}) },

  
  // Updated: Multiple clinic associations with working hours
  clinicAssociations: {
    type: [clinicAssociationSchema],
    default: [],
    validate: {
      validator: function(associations: any[]) {
        // Ensure no duplicate clinic IDs
        const clinicIds = associations.map(a => a.clinicId.toString());
        return clinicIds.length === new Set(clinicIds).size;
      },
      message: 'Cannot have duplicate clinic associations'
    }
  },
  
  // Deprecated: Keep for backward compatibility
  
  
  // Social Media & Professional Links
  
  // Additional fields
 
});

// Add indexes for better performance
DoctorSchema.index({ email: 1 });
DoctorSchema.index({ 'specialty.en': 1 });
DoctorSchema.index({ 'specialty.ar': 1 });
DoctorSchema.index({ 'clinicAssociations.clinicId': 1 });
DoctorSchema.index({ 'clinicAssociations.isActive': 1 });
DoctorSchema.index({ isVerified: 1 });
DoctorSchema.index({ 'reviews.averageRating': -1 });
DoctorSchema.index({ 'fullName.en': 'text', 'fullName.ar': 'text' });

// Update the updatedAt field before saving
DoctorSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Helper methods for working with clinic associations
DoctorSchema.methods.addClinicAssociation = function(clinicId: string, workingHours: any[], notes?: string) {
  const existingAssociation = this.clinicAssociations.find(
    (assoc: any) => assoc.clinicId.toString() === clinicId
  );
  
  if (existingAssociation) {
    throw new Error('Doctor is already associated with this clinic');
  }
  
  this.clinicAssociations.push({
    clinicId,
    workingHours,
    isActive: true,
    joinedDate: new Date(),
    notes
  });
};

DoctorSchema.methods.updateClinicWorkingHours = function(clinicId: string, workingHours: any[]) {
  const association = this.clinicAssociations.find(
    (assoc: any) => assoc.clinicId.toString() === clinicId
  );
  
  if (!association) {
    throw new Error('Doctor is not associated with this clinic');
  }
  
  association.workingHours = workingHours;
};

DoctorSchema.methods.deactivateClinicAssociation = function(clinicId: string) {
  const association = this.clinicAssociations.find(
    (assoc: any) => assoc.clinicId.toString() === clinicId
  );
  
  if (!association) {
    throw new Error('Doctor is not associated with this clinic');
  }
  
  association.isActive = false;
};

const Doctor = models.Doctor || model<Doctor>('Doctor', DoctorSchema);

export default Doctor;