import DoctorCard from "@/app/components/home-page/doctorCard";
import SpecialitiesAndSubs from "@/app/components/home-page/SpecialitiesAndSubs";
import PromoBanner from "@/app/components/home-page/PromoBanner";
import { doctors } from "@/lib/dummyData";
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <main className="w-full">
        {/* Container for larger screens */}
        <div className="md:max-w-4xl md:mx-auto lg:max-w-5xl xl:max-w-6xl">
          <SpecialitiesAndSubs />
          <PromoBanner />
          <section className="px-4 pb-6 md:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">All Doctors</h3>
            <div className="space-y-0">
              {doctors.map((d) => (
                <DoctorCard key={d.id} d={d} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
