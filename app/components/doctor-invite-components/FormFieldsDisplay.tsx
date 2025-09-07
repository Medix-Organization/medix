import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { formFields } from './formfields';

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Onboarding Form Fields</h1>
              <p className="text-gray-600">Here are all the fields you'll need to complete during the onboarding process:</p>
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

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            {/* <h3 className="font-semibold text-blue-900 mb-2">Ready</h3> */}
            <p className="text-blue-800 text-sm mb-4">
              Now that you know what information you'll need, you can proceed with the registration process or 
              provide us with just the name and number or email and we will reach out to you.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleQuickStart}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Registration
              </button>
              <button
                onClick={() => {
                  setShowFieldsList(false);
                  setShowOptions(true);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Back 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFieldsDisplay;