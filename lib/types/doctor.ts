import { Document, Types } from 'mongoose';
import { LocalizedString } from './common'

export interface Doctor extends Document {
  fullName: LocalizedString;
  email: string;
  password: string;
  specialty?: LocalizedString ;
  subspecialty?: LocalizedString[] ;
  clinicId?: Types.ObjectId;
  languages?: string;
  experience?: number;
  gender?: LocalizedString;
  phoneNumber?: string;
  workingHours?: string;
  coveredInsurance?: LocalizedString[];
  location?: LocalizedString; 
  createdAt: Date;
  pageVisits: number;
}