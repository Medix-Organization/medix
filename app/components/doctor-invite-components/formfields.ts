 export const formFields = [
    {
      category: "Basic Information",
      fields: [
        {
          name: "Full Name",
          description: "Your complete professional name as it appears on your medical license (bilingual: English and Arabic)",
          required: true,
          example: "Dr. Ahmed Mohamed / د. أحمد محمد"
        },
        {
          name: "Medical Specialty",
          description: "Your primary area of medical expertise (bilingual: English and Arabic)",
          required: true,
          example: "Cardiology / أمراض القلب"
        },
        {
          name: "Years of Experience",
          description: "Total number of years practicing medicine",
          required: true,
          example: "15 years"
        },
        {
          name: "License Number",
          description: "Your medical license registration number",
          required: false,
          example: "MD123456789"
        },
        {
          name: "Short Bio",
          description: "Brief description of your practice and expertise (bilingual: English and Arabic)",
          required: false,
          example: "Experienced cardiologist specializing in interventional procedures..."
        }
      ]
    },
    {
      category: "Professional Details",
      fields: [
        {
          name: "Title & Credentials",
          description: "Professional titles and academic credentials (multiple entries allowed)",
          required: false,
          example: "MD, PhD, FACC, Professor"
        },
        {
          name: "Certifications & Fellowships",
          description: "Board certifications and fellowship training (multiple entries allowed)",
          required: false,
          example: "American Board of Internal Medicine, Interventional Cardiology Fellowship"
        },
        {
          name: "Professional Memberships",
          description: "Medical associations and professional organizations (multiple entries allowed)",
          required: false,
          example: "American College of Cardiology, European Society of Cardiology"
        },
        {
          name: "Awards & Recognition",
          description: "Professional awards and recognitions received (multiple entries allowed)",
          required: false,
          example: "Best Doctor Award 2023, Excellence in Patient Care"
        },
        {
          name: "Devices & Materials",
          description: "Specialized medical devices or materials you work with (multiple entries allowed)",
          required: false,
          example: "Cardiac Stents, Pacemakers, Defibrillators"
        },
        {
          name: "Languages",
          description: "Languages you can communicate with patients in (multiple entries allowed)",
          required: false,
          example: "English, Arabic, French"
        }
      ]
    },
    {
      category: "Contact & Consultation",
      fields: [
        {
          name: "Phone Number",
          description: "Professional contact number for patient inquiries",
          required: false,
          example: "+1-555-123-4567"
        },
        {
          name: "Consultation Fee",
          description: "Your standard consultation fee amount",
          required: false,
          example: "150 (in your local currency)"
        },
        {
          name: "Online Consultation Availability",
          description: "Whether you offer telemedicine/online consultations",
          required: false,
          example: "Yes/No checkbox"
        }
      ]
    },
    {
      category: "Social & Professional Links",
      fields: [
        {
          name: "LinkedIn Profile",
          description: "Your professional LinkedIn profile URL",
          required: false,
          example: "https://linkedin.com/in/dr-ahmed-mohamed"
        },
        {
          name: "X (Twitter) Profile",
          description: "Your professional X/Twitter profile URL",
          required: false,
          example: "https://x.com/dr_ahmed_cardio"
        },
        {
          name: "Instagram Profile",
          description: "Your professional Instagram profile URL",
          required: false,
          example: "https://instagram.com/dr.ahmed.cardiology"
        },
        {
          name: "Facebook Profile",
          description: "Your professional Facebook profile URL",
          required: false,
          example: "https://facebook.com/dr.ahmed.cardiology"
        },
        {
          name: "ResearchGate Profile",
          description: "Your ResearchGate academic profile URL",
          required: false,
          example: "https://researchgate.net/profile/Ahmed-Mohamed"
        },
        {
          name: "Clinic Website",
          description: "Your clinic or practice website URL",
          required: false,
          example: "https://ahmedcardiology.com"
        }
      ]
    },
    {
      category: "Clinic Association",
      fields: [
        {
          name: "Clinic Associations",
          description: "Clinics or hospitals where you practice (at least one required)",
          required: true,
          example: "City General Hospital, Ahmed Cardiology Clinic"
        }
      ]
    }
  ];