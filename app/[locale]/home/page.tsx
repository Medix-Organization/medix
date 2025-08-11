import DoctorCard from "@/app/components/doctorCard";
import SpecialitiesAndSubs from "@/app/components/SpecialitiesAndSubs";
import { doctors } from "@/lib/dummyData";
import React from "react";

export default function HomePage() {
  return (
    <div className="h-screen w-full bg-gray-50 text-gray-800">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <SpecialitiesAndSubs />
        <section>
          <h3 className="text-lg font-semibold mb-4">Recommended Doctors</h3>
          <div className="space-y-4">
            {doctors.map((d) => (
              <DoctorCard key={d.id} d={d} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
