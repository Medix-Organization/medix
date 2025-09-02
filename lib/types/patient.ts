import { Document } from 'mongoose';
import { LocalizedString } from './common';

export interface Patient extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  location?: LocalizedString;
  age : number , 
  gender : 'male' | 'female'
}