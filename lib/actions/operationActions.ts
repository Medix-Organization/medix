'use server';

import connectToDatabase from '../database';
import { Operation } from '../models/operationModel';

export async function createOperation(operationData: {
  category: string;
  subspecialty: string;
  responsibleRole: string;
  consultationRequired: boolean;
  approximateDuration: number;
  information?: string;
  price?: number;
}) {
  try {
    await connectToDatabase();
    
    const operation = new Operation(operationData);
    await operation.save();
    
    return JSON.parse(JSON.stringify(operation));
  } catch (error) {
    console.error('Error creating operation:', error);
    throw error;
  }
}

export async function getAllOperations() {
  try {
    await connectToDatabase();
    
    const operations = await Operation.find({})
      .populate('responsibleDoctor')
      .sort({ category: 1, subspecialty: 1 })
      .lean();
    
    return JSON.parse(JSON.stringify(operations));
  } catch (error) {
    console.error('Error fetching operations:', error);
    throw error;
  }
}