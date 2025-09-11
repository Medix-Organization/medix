import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa';

const ContactFormOption: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    clinics: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }
      
      console.log('Contact info submitted:', contactInfo);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to send your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="text-center py-4">
          <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-2" />
          <p className="text-green-600 font-medium">Thank you! We've received your information.</p>
          <p className="text-gray-600 mt-2">Our team will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <p className="text-blue-800 text-sm mb-4">
            Provide your contact information and our team will reach out to assist you.
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactChange}
                  className="pl-10 w-full p-2 border bg-white border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Dr. John Doe"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  className="pl-10 w-full p-2 border bg-white border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="doctor@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phone">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactChange}
                  className="pl-10 w-full p-2 border bg-white border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+966 5X XXX XXXX"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="clinics">
                My Clinic Names
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="clinics"
                  name="clinics"
                  value={contactInfo.clinics}
                  onChange={handleContactChange}
                  className="w-full p-2 border bg-white border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Clinic One, Clinic Two"
                />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Contact Information'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactFormOption;