import { Schema } from 'mongoose';

// Social Links Schema
export const socialLinksSchema = new Schema({
  linkedin: { 
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https:\/\/(www\.)?linkedin\.com\//.test(v);
      },
      message: 'LinkedIn URL must be a valid LinkedIn profile URL'
    }
  },
  instagram: { 
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https:\/\/(www\.)?instagram\.com\//.test(v);
      },
      message: 'Instagram URL must be a valid Instagram profile URL'
    }
  },
  x: { 
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https:\/\/(www\.)?(twitter|x)\.com\//.test(v);
      },
      message: 'X/Twitter URL must be a valid X or Twitter profile URL'
    }
  },
  snapchat: { 
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https:\/\/(www\.)?snapchat\.com\//.test(v);
      },
      message: 'Snapchat URL must be a valid Snapchat profile URL'
    }
  },
  researchGate: { 
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https:\/\/(www\.)?researchgate\.net\//.test(v);
      },
      message: 'ResearchGate URL must be a valid ResearchGate profile URL'
    }
  },
  clinicWebsite: { 
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Clinic website must be a valid URL'
    }
  }
}, { _id: false });