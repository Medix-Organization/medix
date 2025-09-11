'use client';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Operation {
  id: string;
  name: string;
  description?: string;
}

interface OperationsManagementProps {
  clinicId: string;
  onComplete: () => void;
}


export default function OperationsManagement({ clinicId, onComplete }: OperationsManagementProps) {
  const [selectedOperations, setSelectedOperations] = useState<Operation[]>([]);
  const [customOperation, setCustomOperation] = useState({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  const handleAddCustomOperation = () => {
    if (customOperation.name.trim()) {
      setSelectedOperations(prev => [...prev, {
        id: Date.now().toString(),
        name: customOperation.name.trim(),
        description: customOperation.description.trim() || undefined
      }]);
      setCustomOperation({ name: '', description: '' });
    }
  };

  const handleRemoveOperation = (id: string) => {
    setSelectedOperations(prev => prev.filter(op => op.id !== id));
  };

  const handleSubmit = async () => {
    if (selectedOperations.length === 0) {
      alert('Please select at least one operation.');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Save operations to clinic
      // await saveClinicOperations(clinicId, selectedOperations);
      console.log('Saving operations for clinic:', clinicId, selectedOperations);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onComplete();
    } catch (error) {
      console.error('Error saving operations:', error);
      alert('Failed to save operations. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Add Your Clinic Operations</h2>
      <p className="text-gray-600 mb-6">Select the medical services and operations your clinic provides.</p>


      {/* Custom Operation */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Add Custom Operation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operation Name</label>
            <input
              type="text"
              value={customOperation.name}
              onChange={(e) => setCustomOperation(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Cosmetic Surgery"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
            <input
              type="text"
              value={customOperation.description}
              onChange={(e) => setCustomOperation(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the operation"
            />
          </div>
        </div>
        <button
          onClick={handleAddCustomOperation}
          disabled={!customOperation.name.trim()}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <FaPlus className="mr-2" /> Add Operation
        </button>
      </div>

      {/* Selected Operations */}
      {selectedOperations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Selected Operations ({selectedOperations.length})</h3>
          <div className="space-y-2">
            {selectedOperations.map((operation) => (
              <div key={operation.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                <div>
                  <div className="font-medium text-blue-900">{operation.name}</div>
                  {operation.description && (
                    <div className="text-sm text-blue-600">{operation.description}</div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveOperation(operation.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {selectedOperations.length} operation(s) selected
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onComplete()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Skip for Now
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Continue to Doctors'}
          </button>
        </div>
      </div>
    </div>
  );
}