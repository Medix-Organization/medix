import { Schema } from 'mongoose';

// Location Schema
export const locationSchema = new Schema({
  googleMapLink: { 
    type: String, 
    required: false, // Make this optional
    validate: {
      validator: function(v: string) {
        return !v || /^https:\/\/(www\.)?google\.(com|[a-z]{2,3}(\.[a-z]{2})?)?\/maps/.test(v);
      },
      message: 'Google Map link must be a valid Google Maps URL'
    }
  },
  // Additional location fields for future use
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String }
  },
  coordinates: {
    latitude: { type: Number, required: true }, // Make coordinates required instead
    longitude: { type: Number, required: true }
  }
}, { _id: false });