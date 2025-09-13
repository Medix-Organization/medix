import { Schema, model, models, Document, Types } from 'mongoose';

// TypeScript interface for Operation
export interface OperationType {
  _id: Types.ObjectId;
  category: string;
  subspecialty: string;
  responsibleRole: string | Types.ObjectId;
  consultationRequired: boolean;
  approximateDuration: number;
  information?: string;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for Operation
const OperationSchema = new Schema<OperationType>({
  category: {
    type: String,
    required: true,
    trim: true,
    // You can add enum validation if you have specific categories
    // enum: ['Dermatology', 'Laser Treatments', 'Cosmetic Procedures']
  },
  subspecialty: {
    type: String,
    required: true,
    trim: true
  }, 
  responsibleRole: {
    type: Schema.Types.Mixed, // Can be either String or ObjectId
    required: true,
    validate: {
      validator: function(value: any) {
        // Allow either string or valid ObjectId
        return typeof value === 'string' || Types.ObjectId.isValid(value);
      },
      message: 'responsibleRole must be either a string or a valid ObjectId'
    }
  },
  consultationRequired: {
    type: Boolean,
    default: false
  },
  approximateDuration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 minute'],
    validate: {
      validator: Number.isInteger,
      message: 'Duration must be an integer'
    }
  },
  information: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
OperationSchema.index({ category: 1 });
OperationSchema.index({ subspecialty: 1 });
OperationSchema.index({ category: 1, subspecialty: 1 });

// Virtual to populate doctor information if responsibleRole is ObjectId
OperationSchema.virtual('responsibleDoctor', {
  ref: 'Doctor',
  localField: 'responsibleRole',
  foreignField: '_id',
  justOne: true,
  match: function() {
    // Only populate if responsibleRole is an ObjectId
    return Types.ObjectId.isValid(this.responsibleRole);
  }
});

// Export the model
export const Operation = models?.Operation || model<OperationType>('Operation', OperationSchema);
export default Operation;