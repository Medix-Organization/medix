'use server';

import connectToDatabase from '../database';
import { Clinic } from '../models/clinicModel';
import { Operation } from '../models/operationModel';
import { Doctor } from '../models/doctorModel';
import { Types } from 'mongoose';

// Add operations to clinic
export async function addOperationsToClinic(clinicId: string, operationIds: string[]) {
  try {
    await connectToDatabase();
    
    // Validate operations exist
    const operations = await Operation.find({ _id: { $in: operationIds } });
    if (operations.length !== operationIds.length) {
      throw new Error('Some operations not found');
    }
    
    const clinic = await Clinic.findByIdAndUpdate(
      clinicId,
      { $addToSet: { operations: { $each: operationIds } } },
      { new: true, runValidators: true }
    ).populate('operations');
    
    if (!clinic) {
      throw new Error('Clinic not found');
    }
    
    return JSON.parse(JSON.stringify(clinic));
  } catch (error) {
    console.error('Error adding operations to clinic:', error);
    throw error;
  }
}

// Remove operations from clinic
export async function removeOperationsFromClinic(clinicId: string, operationIds: string[]) {
  try {
    await connectToDatabase();
    
    const clinic = await Clinic.findByIdAndUpdate(
      clinicId,
      { $pull: { operations: { $in: operationIds } } },
      { new: true, runValidators: true }
    ).populate('operations');
    
    if (!clinic) {
      throw new Error('Clinic not found');
    }
    
    return JSON.parse(JSON.stringify(clinic));
  } catch (error) {
    console.error('Error removing operations from clinic:', error);
    throw error;
  }
}

// Get all available operations
export async function getAllOperations() {
  try {
    await connectToDatabase();
    
    const operations = await Operation.find({})
      .sort({ category: 1, subspecialty: 1 })
      .lean();
    
    // Manually populate doctor information only for ObjectId references
    const populatedOperations = await Promise.all(
      operations.map(async (operation) => {
        if (Types.ObjectId.isValid(operation.responsibleRole)) {
          const doctor = await Doctor.findById(operation.responsibleRole).lean();
          return {
            ...operation,
            responsibleDoctor: doctor
          };
        }
        return operation;
      })
    );
     
    return JSON.parse(JSON.stringify(populatedOperations));
  } catch (error) {
    console.error('Error fetching operations:', error);
    throw error;
  }
}

// Add doctor to clinic with schedule
export async function addDoctorToClinic(
  clinicId: string, 
  doctorId: string, 
  workingHours: any[],
  notes?: string
) {
  try {
    await connectToDatabase();
    
    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    
    // Add clinic association to doctor
    const existingAssociation = doctor.clinicAssociations.find(
      (assoc: { clinicId: Types.ObjectId }) => assoc.clinicId.toString() === clinicId
    );
    
    if (existingAssociation) {
      // Update existing association
      existingAssociation.workingHours = workingHours;
      existingAssociation.notes = notes;
      existingAssociation.isActive = true;
    } else {
      // Add new association
      doctor.clinicAssociations.push({
        clinicId: new Types.ObjectId(clinicId),
        workingHours,
        isActive: true,
        joinedDate: new Date(),
        notes
      });
    }
    
    await doctor.save();
    
    // Add doctor to clinic's doctors array
    await Clinic.findByIdAndUpdate(
      clinicId,
      { $addToSet: { doctors: doctorId } },
      { runValidators: true }
    );
    
    return JSON.parse(JSON.stringify(doctor));
  } catch (error) {
    console.error('Error adding doctor to clinic:', error);
    throw error;
  }
}

// Remove doctor from clinic
export async function removeDoctorFromClinic(clinicId: string, doctorId: string) {
  try {
    await connectToDatabase();
    
    // Remove association from doctor
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      doctor.clinicAssociations = doctor.clinicAssociations.filter(
        (assoc: { clinicId: Types.ObjectId }) => assoc.clinicId.toString() !== clinicId
      );
      await doctor.save();
    }
    
    // Remove doctor from clinic
    await Clinic.findByIdAndUpdate(
      clinicId,
      { $pull: { doctors: doctorId } }
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error removing doctor from clinic:', error);
    throw error;
  }
}

// Get all available doctors
export async function getAllDoctors() {
  try {
    await connectToDatabase();
    
    const doctors = await Doctor.find({ isVerified: true })
      .select('fullName specialty email phoneNumber clinicAssociations')
      .lean();
    
    return JSON.parse(JSON.stringify(doctors));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
}