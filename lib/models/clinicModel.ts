import { Schema, models, model } from 'mongoose';
import { locationSchema } from './locationModel';
import type { ClinicType } from '../types/clinic';

const ClinicSchema: Schema = new Schema<ClinicType>({
  // Basic information
  name: { type: String },
  displayName: {
    text: { type: String },
    languageCode: { type: String }
  },
  
  // Google Places API specific fields
  googlePlaceId: { type: String, unique: true, sparse: true },
  types: [{ type: String }],
  businessStatus: { type: String },
  
  // Address information
  formattedAddress: { type: String },
  addressComponents: [{
    longName: { type: String },
    shortName: { type: String },
    types: [{ type: String }]
  }],
  
  // Location information - FIXED: Use locationSchema for consistency
  location: { type: locationSchema, required: true },
  
  // Contact information
  nationalPhoneNumber: { type: String },
  internationalPhoneNumber: { type: String },
  website: { type: String },
  
  // Business information
  rating: { type: Number, min: 0, max: 5 },
  userRatingsTotal: { type: Number, min: 0 },
  priceLevel: { type: Number, min: 0, max: 4 },
  
  // Opening hours
  openingHours: {
    openNow: { type: Boolean },
    periods: [{
      open: {
        day: { type: Number, min: 0, max: 6 },
        time: { type: String }
      },
      close: {
        day: { type: Number, min: 0, max: 6 },
        time: { type: String }
      }
    }],
    weekdayText: [{ type: String }]
  },
  
  // Photos
  photos: [{
    name: { type: String },
    widthPx: { type: Number },
    heightPx: { type: Number },
    authorAttributions: [{
      displayName: { type: String },
      uri: { type: String },
      photoUri: { type: String }
    }]
  }],
  
  // Reviews
  reviews: [{
    name: { type: String },
    relativePublishTimeDescription: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    text: {
      text: { type: String },
      languageCode: { type: String }
    },
    originalText: {
      text: { type: String },
      languageCode: { type: String }
    },
    authorAttribution: {
      displayName: { type: String },
      uri: { type: String },
      photoUri: { type: String }
    },
    publishTime: { type: String }
  }],
  
  // Additional Google Places fields
  editorialSummary: {
    text: { type: String },
    languageCode: { type: String }
  },
  
  // Legacy fields (for backward compatibility)
  pin: { type: String },
  license: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  description: {
    translations: {
      en: { type: String },
      ar: { type: String }
    }
  },
  address: {
    translations: {
      en: { type: String },
      ar: { type: String }
    }
  },
  
  // Clinic metadata
  isActive: { type: Boolean, default: true },
  verificationStatus: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  },
  
  // App-specific fields
  doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctor' }],
  
  // Google Maps integration
  googleMapsUri: { type: String },
  googleMapsLinks: {
    placeUri: { type: String },
    directionsUri: { type: String },
    reviewsUri: { type: String },
    photosUri: { type: String },
    writeReviewUri: { type: String }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
// Remove the duplicate index - keep only one
ClinicSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
// Remove this line: ClinicSchema.index({ googlePlaceId: 1 }); 
// The unique: true in the schema definition already creates an index
ClinicSchema.index({ name: 'text', formattedAddress: 'text' });
ClinicSchema.index({ types: 1 });
ClinicSchema.index({ businessStatus: 1 });

export const Clinic = models?.Clinic || model<ClinicType>('Clinic', ClinicSchema);
export default Clinic;