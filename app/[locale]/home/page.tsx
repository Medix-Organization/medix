import DoctorCard from "@/app/components/home-page/doctorCard";
import SpecialitiesAndSubs from "@/app/components/home-page/SpecialitiesAndSubs";
import { doctors } from "@/lib/dummyData";
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <SpecialitiesAndSubs />
        <section className="mt-6 sm:mt-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 px-2">Find Doctors</h3>
          <div className="space-y-3 sm:space-y-4">
            {doctors.map((d) => (
              <DoctorCard key={d.id} d={d} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
