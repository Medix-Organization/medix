import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const DoctorCard = async (d: any) => {
  const t = await getTranslations("home");
  console.log(d);

  return (
    <Link href={`/doctor-profile/${d.d.id || 'default'}`} className="block cursor-pointer transition-shadow duration-200">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-4 mb-4 hover:border-gray-200 transition-colors duration-200 md:mx-6 lg:mx-8">
      <div className="p-4 pb-2">
        <div className="flex items-start gap-3 sm:gap-4">
          <Image
            width={80}
            height={80}
            src={`/${d.d.avatar}`}
            alt={d.d.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 leading-tight">{d.d.name}</h3>
                <div className="inline-block bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2">
                  {d.d.role}
                </div>
              </div>
              <div className="flex flex-col gap-1 flex-shrink-0 min-w-0 ml-2">
                <button className="p-1 sm:p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 hover:shadow-md hover:border-gray-300 flex-shrink-0 transition-all duration-200">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="p-1 sm:p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 hover:shadow-md hover:border-gray-300 flex-shrink-0 transition-all duration-200">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none w-full">{d.d.description}</p>
          </div>
        </div>

        <div className="border-t-3 border-gray-300 pt-3 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate"> <b>Experience:</b> +18 Years</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate"> <b>Location:</b> {d.d.clinic} </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate"><b>9 mins away</b></span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.60L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="truncate"> <b>Recommendation:</b> {d.ratingPercent}%</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate"> <b> 30  </b>Reviews {d.reviewsCount}</span>

            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-5">
            {d.d.tags.slice(0, 3).map((tag: any, index: number) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-end sm:justify-end pt-2 border-t border-gray-200">

            <div className="text-center sm:text-right">
              <div className="text-lg sm:text-2xl text-gray-900">
                <span className="text-gray-500 font-normal">Consultation </span>
                <span className="font-bold">250 SAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default DoctorCard;
