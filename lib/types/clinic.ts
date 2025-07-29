import { Document } from 'mongoose';
import { LocalizedString } from './common';

export interface Clinic extends Document {
  name: string;
  createdAt: Date;
  address: LocalizedString | null;
  pin: string | null;
}