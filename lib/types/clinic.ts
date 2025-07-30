import { Document } from 'mongoose';
import { LocalizedString } from './common';

export interface Clinic extends Document {
  name: LocalizedString; 
  createdAt: Date;
  address?: LocalizedString ;
  pin?: string ;
}