import { useState } from 'react';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';

const FileUploadOption: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload file');
      }
      
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="text-center py-4">
          <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-2" />
          <p className="text-green-600 font-medium">Thank you! Your document has been uploaded.</p>
          <p className="text-gray-600 mt-2">Our team will review it and contact you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleFileSubmit} className="space-y-4">
          <p className="text-blue-800 text-sm mb-2">
            Upload your documents and our team will help you complete your profile.
          </p>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
            <FaUpload className="text-blue-400 text-3xl mx-auto mb-2" />
            <p className="text-blue-600 font-medium mb-2">Drag and drop your file here</p>
            <p className="text-gray-500 text-sm mb-4">or</p>
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <label 
              htmlFor="file-upload" 
              className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded cursor-pointer hover:bg-blue-50"
            >
              Browse Files
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-600">{file.name}</p>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={!file || uploading}
          >
            {uploading ? 'Sending...' : 'Send File'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FileUploadOption;