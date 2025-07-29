import { Schema, Document, models, model } from 'mongoose';
import type { Clinic } from '../types/clinic';
import { localizedStringSchema } from '../schemas/localizedString';

const ClinicSchema: Schema = new Schema<Clinic>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  address: { type: localizedStringSchema, required: true },
  pin: { type: String, required: true }
});


const Clinic = models.Clinic || model<Clinic>('Clinic', ClinicSchema);

export default Clinic;