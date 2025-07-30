import { Document } from 'mongoose';
import { LocalizedString } from './common';

export interface Patient extends Document {
  fullName: LocalizedString;
  email: string;
  password: string;
  createdAt: Date;
  location?: LocalizedString;
}