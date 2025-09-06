'use client';
import { useState } from 'react';
import { createOperation } from '@/lib/actions/operationActions';

interface OperationsManagerProps {
  clinicOperations: any[];
  allOperations: any[];
  onOperationsChange: (selectedOperations: string[]) => void;
  // Remove onCreateOperation entirely
}

export default function OperationsManager({
  clinicOperations,
  allOperations,
  onOperationsChange,
//   onCreateOperation // Add this to destructuring
}: OperationsManagerProps) {
  const [selectedOperations, setSelectedOperations] = useState<string[]>(
    clinicOperations.map(op => op._id)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [operations, setOperations] = useState(allOperations);

  // Form state for creating new operation
  const [newOperation, setNewOperation] = useState({
    category: '',
    subspecialty: '',
    responsibleRole: '',
    consultationRequired: false,
    approximateDuration: 30,
    information: '',
    price: 0
  });

  const categories = [...new Set(operations.map(op => op.category))];
  
  const filteredOperations = operations.filter(operation => {
    const matchesSearch = operation.subspecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         operation.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || operation.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOperationToggle = (operationId: string) => {
    const newSelected = selectedOperations.includes(operationId)
      ? selectedOperations.filter(id => id !== operationId)
      : [...selectedOperations, operationId];
    
    setSelectedOperations(newSelected);
    onOperationsChange(newSelected);
  };

  const handleCreateOperation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const createdOperation = await createOperation(newOperation);
      
      // Add to operations list
      setOperations(prev => [...prev, createdOperation]);
      
      // Auto-select the new operation
      const newSelected = [...selectedOperations, createdOperation._id];
      setSelectedOperations(newSelected);
      onOperationsChange(newSelected);
      
      // Reset form
      setNewOperation({
        category: '',
        subspecialty: '',
        responsibleRole: '',
        consultationRequired: false,
        approximateDuration: 30,
        information: '',
        price: 0
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating operation:', error);
      alert('Failed to create operation. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Clinic Operations</h3>
          <p className="text-sm text-gray-600 mb-6">
            Select existing operations or create new ones for this clinic.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showCreateForm ? 'Cancel' : 'Create New Operation'}
        </button>
      </div>

      {/* Create Operation Form */}
      {showCreateForm && (
        <div className="bg-gray-50 rounded-lg p-6 border">
          <h4 className="text-md font-medium text-gray-900 mb-4">Create New Operation</h4>
          <form onSubmit={handleCreateOperation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={newOperation.category}
                  onChange={(e) => setNewOperation(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Cosmetic Treatment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subspecialty *
                </label>
                <input
                  type="text"
                  required
                  value={newOperation.subspecialty}
                  onChange={(e) => setNewOperation(prev => ({ ...prev, subspecialty: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Botox Injection"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsible Role *
                </label>
                <input
                  type="text"
                  required
                  value={newOperation.responsibleRole}
                  onChange={(e) => setNewOperation(prev => ({ ...prev, responsibleRole: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Dermatologist"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newOperation.approximateDuration}
                  onChange={(e) => setNewOperation(prev => ({ ...prev, approximateDuration: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (optional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newOperation.price}
                  onChange={(e) => setNewOperation(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consultationRequired"
                  checked={newOperation.consultationRequired}
                  onChange={(e) => setNewOperation(prev => ({ ...prev, consultationRequired: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="consultationRequired" className="ml-2 block text-sm text-gray-700">
                  Consultation Required
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Information (optional)
              </label>
              <textarea
                value={newOperation.information}
                onChange={(e) => setNewOperation(prev => ({ ...prev, information: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional information about this operation..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isCreating ? 'Creating...' : 'Create Operation'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search operations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOperations.map((operation) => {
          const isSelected = selectedOperations.includes(operation._id);
          return (
            <div
              key={operation._id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleOperationToggle(operation._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{operation.subspecialty}</h4>
                  <p className="text-sm text-gray-600">{operation.category}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Duration: {operation.approximateDuration} min
                  </p>
                  {operation.price && (
                    <p className="text-xs text-green-600 mt-1">
                      Price: ${operation.price}
                    </p>
                  )}
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              {operation.information && (
                <p className="text-xs text-gray-500 mt-2">{operation.information}</p>
              )}
            </div>
          );
        })}
      </div>

      {filteredOperations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No operations found matching your criteria.
        </div>
      )}

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Selected Operations Summary</h4>
        <p className="text-sm text-gray-600">
          {selectedOperations.length} operations selected for this clinic
        </p>
      </div>
    </div>
  );
}