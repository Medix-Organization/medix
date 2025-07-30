import { Schema } from 'mongoose';

export const localizedStringSchema = new Schema({
  translations: {
    type: Map,
    of: String,
    required: true
  }
}, { _id: false });