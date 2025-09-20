import DoctorCard from "@/app/components/home-page/doctorCard";
import SpecialitiesAndSubs from "@/app/components/home-page/SpecialitiesAndSubs";
import PromoBanner from "@/app/components/home-page/PromoBanner";
import { getAllVerifiedDoctors } from "@/lib/actions/getDoctorById";
import React from "react";

export default async function HomePage() {
  // Fetch doctors from database instead of using dummy data
  const doctors = await getAllVerifiedDoctors();

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <main className="w-full">
        {/* Container for larger screens */}
        <div className="md:max-w-4xl md:mx-auto lg:max-w-5xl xl:max-w-6xl">
          <SpecialitiesAndSubs />
          <PromoBanner />
          <section className="px-4 pb-6 md:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">All Doctors</h3>
            {doctors.length > 0 ? (
              <div className="space-y-0">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor._id} d={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No verified doctors available at the moment.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
