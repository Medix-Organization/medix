import Tabs from "@/app/components/Tabs";
import Image from "next/image";
import React from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaGraduationCap, FaLocationDot } from "react-icons/fa6";
import { getDoctorByMongoId } from "@/lib/actions/getDoctorById";
import { notFound } from "next/navigation";
import { getLocalizedText } from "@/lib/utils/localization";

const Page = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const { id } = await params;
  const doctorId = id[0]; // Get the first part of the dynamic route
  
  console.log('🔍 Doctor profile page - fetching doctor with ID:', doctorId);
  
  // Fetch doctor data from database
  const doctor = await getDoctorByMongoId(doctorId);
  
  if (!doctor) {
    console.log('❌ Doctor not found with ID:', doctorId);
    notFound();
  }
  
  console.log('✅ Doctor data loaded:', {
    id: doctor._id,
    name: doctor.fullName,
    specialty: doctor.specialty
  });

  return (
    <main className="flex flex-col lg:flex-row gap-4 p-4 md:p-8 text-gray-800 mb-20 md:mb-0 md:max-w-6xl md:mx-auto lg:max-w-7xl xl:max-w-7xl xl:px-12 2xl:max-w-8xl">
      {/* Doctor Info Sidebar */}
      <section className="flex flex-col lg:flex-[0.35] lg:max-w-md w-full bg-white rounded-lg shadow-lg border border-gray-100 p-4 md:p-8 h-fit lg:self-start lg:sticky lg:top-8">
        {/* Profile Header */}
        <section className="mb-6">
          <section className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center sm:items-start lg:items-center xl:items-start gap-4 lg:gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={doctor.profileImage || "/ahmad.jpg"}
                  alt="Doctor Profile"
                  width={180}
                  height={180}
                  className="rounded-full w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] object-cover shadow-lg border-4 border-white"
                />
                {doctor.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center sm:text-left lg:text-center xl:text-left w-full">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                {await getLocalizedText(doctor.fullName)}
              </h1>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm lg:text-base font-medium rounded-full w-fit mx-auto sm:mx-0 lg:mx-auto xl:mx-0 shadow-md">
                {await getLocalizedText(doctor.specialty)}
              </div>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-sm mx-auto sm:mx-0 lg:mx-auto xl:mx-0">
                {await getLocalizedText(doctor.shortBio) || "Experienced medical professional committed to providing comprehensive healthcare."}
              </p>
            </div>
          </section>
        </section>

        {/* Stats and Info Grid */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Experience */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                <FaGraduationCap className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Experience</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900">
                  {doctor.yearsOfExperience} years
                </p>
              </div>
            </div>

            {/* Online Consultation Availability */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Online Consultation</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900">
                  {doctor.availableForOnlineConsultation ? (
                    <span className="text-green-600">Available</span>
                  ) : (
                    <span className="text-gray-500">Not Available</span>
                  )}
                </p>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Languages</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900">
                  {doctor.languages && doctor.languages.length > 0 ? doctor.languages.join(', ') : 'Not specified'}
                </p>
              </div>
            </div>

            {/* Reviews Count */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <div className="flex-shrink-0 p-2 bg-orange-100 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Patient Reviews</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900">
                  <span className="text-lg">{doctor.numberOfReviews || 0}</span> Reviews
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Consultation Fee */}
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-600">Consultation Fee</p>
          <p className="text-2xl lg:text-3xl font-bold text-blue-600">
            {doctor.consultationFee ? `${doctor.consultationFee} SAR` : 'Price on request'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex flex-col lg:flex-[0.65] w-full bg-white rounded-lg shadow-lg border border-gray-100 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Doctor Profile</h1>
          <p className="text-gray-600 text-lg">Detailed information and professional background</p>
        </div>
        <Tabs doctor={doctor} />
      </section>
    </main>
  );
};

export default Page;
