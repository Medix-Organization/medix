import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { formFields } from './formfields';
import { useState } from 'react';
import RegistrationOption from './RegistrationOption';
import FileUploadOption from './FileUploadOption';
import ContactFormOption from './ContactFormOption';
import { FiChevronDown } from 'react-icons/fi';

interface FormFieldsDisplayProps {
  setShowFieldsList: (show: boolean) => void;
  setShowOptions: (show: boolean) => void;
  handleQuickStart: () => void;
}

const FormFieldsDisplay: React.FC<FormFieldsDisplayProps> = ({ 
  setShowFieldsList, 
  setShowOptions,
  handleQuickStart 
}) => {
  const [activeOption, setActiveOption] = useState<'form' | 'upload' | 'contact'>('contact');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gray-600">Choose your preferred option to proceed with the onboarding process:</p>
            </div>
            <button
              onClick={() => {
                setShowFieldsList(false);
                setShowOptions(true);
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Action Options Section - Now First */}
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 mb-8">
            <h3 className="font-semibold text-blue-900 mb-4">Choose Your Preferred Option</h3>
            
            {/* Mobile-friendly Option Selector - Improved Dropdown */}
            <div className="mb-6 relative md:hidden">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                className="w-full p-3 border border-blue-400 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center shadow-sm active:bg-gray-50"
              >
                <span className="font-medium">
                  {activeOption === 'form' ? 'Register by Myself' : 
                   activeOption === 'upload' ? 'Upload Documents' : 'Contact Me'}
                </span>
                <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-20 mt-1 w-full text-black bg-white border border-blue-200 rounded-lg shadow-xl ring-1 ring-black/5">
                  <button 
                    onClick={() => {
                      setActiveOption('form');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-gray-900 hover:bg-blue-100 ${activeOption === 'form' ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                  >
                    Register by Myself
                  </button>
                  <button 
                    onClick={() => {
                      setActiveOption('upload');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-gray-900 hover:bg-blue-100 ${activeOption === 'upload' ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                  >
                    Upload Documents
                  </button>
                  <button 
                    onClick={() => {
                      setActiveOption('contact');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-gray-900 hover:bg-blue-100 ${activeOption === 'contact' ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                  >
                    Contact Me
                  </button>
                </div>
              )}
            </div>
            
            {/* Desktop Tabs - Hidden on Mobile */}
            <div className="hidden md:flex border-b border-blue-200">
              <button 
                onClick={() => setActiveOption('form')} 
                className={`px-4 py-2 ${activeOption === 'form' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
              >
                Register by Myself
              </button>
              <button 
                onClick={() => setActiveOption('upload')} 
                className={`px-4 py-2 ${activeOption === 'upload' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
              >
                Upload Documents
              </button>
              <button 
                onClick={() => setActiveOption('contact')} 
                className={`px-4 py-2 ${activeOption === 'contact' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
              >
                Contact Me
              </button>
            </div>
            
            {/* Option Content */}
            {activeOption === 'form' && (
              <RegistrationOption 
                handleQuickStart={handleQuickStart} 
              />
            )}
            
            {activeOption === 'upload' && (
              <FileUploadOption />
            )}
            
            {activeOption === 'contact' && (
              <ContactFormOption />
            )}
            
            <div className="mt-6 pt-4 border-t border-blue-200">
              <button
                onClick={() => {
                  setShowFieldsList(false);
                  setShowOptions(true);
                }}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <FaTimes className="mr-2" /> Back to Options
              </button>
            </div>
          </div>

          {/* Required Fields Section - Now Last */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Fields Reference</h2>
            <p className="text-gray-600 mb-6">Here are all the fields you'll need to complete during the onboarding process:</p>
            
            <div className="space-y-8">
              {formFields.map((category, categoryIndex) => (
                <div key={categoryIndex} className="border-l-4 border-blue-500 pl-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FaCheckCircle className="text-blue-500 mr-2" />
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 flex items-center">
                            {field.name}
                            {field.required && (
                              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                                REQUIRED
                              </span>
                            )}
                            {!field.required && (
                              <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                Optional
                              </span>
                            )}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{field.description}</p>
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <p className="text-xs text-blue-800">
                            <strong>Example:</strong> {field.example}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFieldsDisplay;