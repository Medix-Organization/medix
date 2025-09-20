"use client";
import { useState } from "react";
import { DoctorType } from "@/lib/types/doctor";
import { getLocalizedTextSync } from "@/lib/utils/localization";
import { useLocale } from "next-intl";

interface TabsProps {
  doctor: DoctorType;
}

export default function Tabs({ doctor }: TabsProps) {
  const tabs = ["Description", "Gallery", "Google Reviews", "Medix Reviews"];
  const [activeTab, setActiveTab] = useState("Description");
  const locale = useLocale();

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-6 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 md:p-6">
        {activeTab === "Description" && (
          <div>
            <div className="max-w-none space-y-3">
              {/* Specialty and Bio Section */}
              <div className="space-y-1 bg-slate-200 rounded-md p-3">
                <div className="text-gray-800 font-semibold text-sm sm:text-base">
                  {getLocalizedTextSync(doctor.specialty, locale) || 'Medical Specialist'}
                </div>
                {doctor.shortBio && getLocalizedTextSync(doctor.shortBio, locale) && (
                  <div className="text-gray-600 text-sm sm:text-base">
                    {getLocalizedTextSync(doctor.shortBio, locale)}
                  </div>
                )}
              </div>

              {/* Qualifications Section */}
              <div className="space-y-3">
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Qualifications</h3>
                {doctor.titleCredentials && doctor.titleCredentials.length > 0 ? (
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    {doctor.titleCredentials.map((credential, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>{credential}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">No qualifications information available for this doctor.</p>
                )}

                {/* Certifications & Fellowships */}
                {doctor.certificationsFellowships && doctor.certificationsFellowships.length > 0 && (
                  <>
                    <h4 className="text-gray-700 font-medium text-sm mt-4">Certifications & Fellowships</h4>
                    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                      {doctor.certificationsFellowships.map((cert, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Professional Memberships */}
                {doctor.memberships && doctor.memberships.length > 0 && (
                  <>
                    <h4 className="text-gray-700 font-medium text-sm mt-4">Professional Memberships</h4>
                    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                      {doctor.memberships.map((membership, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>{membership}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Awards */}
                {doctor.awards && doctor.awards.length > 0 && (
                  <>
                    <h4 className="text-gray-700 font-medium text-sm mt-4">Awards & Recognition</h4>
                    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                      {doctor.awards.map((award, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Experience */}
                <div className="mt-4">
                  <h4 className="text-gray-700 font-medium text-sm">Experience</h4>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    {doctor.yearsOfExperience} of clinical experience
                  </p>
                </div>

                {/* License Information */}
                {doctor.licenseNumber && (
                  <div className="mt-4">
                    <h4 className="text-gray-700 font-medium text-sm">License Information</h4>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      License Number: {doctor.licenseNumber}
                    </p>
                  </div>
                )}
              </div>

              {/* Subspecialties Section */}
              {doctor.subspecialties && doctor.subspecialties.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Subspecialties</h3>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    {doctor.subspecialties.map((subspecialty, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>{getLocalizedTextSync(subspecialty, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials and Devices Section */}
              <div className="space-y-3">
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Materials and Devices</h3>
                {doctor.devicesMaterials && doctor.devicesMaterials.length > 0 ? (
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    {doctor.devicesMaterials.map((device, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>{device}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">No materials and devices information available for this doctor.</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Contact Information</h3>
                <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                  {doctor.phoneNumber && (
                    <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
                  )}
                  <p><strong>Email:</strong> {doctor.email}</p>
                  {doctor.availableForOnlineConsultation && (
                    <p className="text-green-600"><strong>✓</strong> Available for online consultations</p>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {doctor.socialLinks && Object.values(doctor.socialLinks).some(link => link) && (
                <div className="space-y-3">
                  <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Professional Links</h3>
                  <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                    {doctor.socialLinks.linkedin && (
                      <p><strong>LinkedIn:</strong> <a href={doctor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{doctor.socialLinks.linkedin}</a></p>
                    )}
                    {doctor.socialLinks.researchGate && (
                      <p><strong>ResearchGate:</strong> <a href={doctor.socialLinks.researchGate} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{doctor.socialLinks.researchGate}</a></p>
                    )}
                    {doctor.socialLinks.clinicWebsite && (
                      <p><strong>Clinic Website:</strong> <a href={doctor.socialLinks.clinicWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{doctor.socialLinks.clinicWebsite}</a></p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "Gallery" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Gallery</h2>
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm italic">No gallery images available for this doctor.</p>
            </div>
          </div>
        )}

        {activeTab === "Google Reviews" && (
          <div>
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm italic">No Google reviews available for this doctor.</p>
            </div>
          </div>
        )}

        {activeTab === "Medix Reviews" && (
          <div>
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm italic">No Medix reviews available for this doctor yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
