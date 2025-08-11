import { getTranslations } from "next-intl/server";
import Image from "next/image";

const DoctorCard = async (d: any) => {

  const t  = await getTranslations('home')


  return (
    <div key={d.id} className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-start gap-4">
        <Image
          width={56}
          height={56}
          src={`/${d.avatar}`}
          alt={'d.name'}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{d.name}</div>
              <div className="text-sm text-blue-600">{d.role}</div>
              {d.description && (
                <div className="text-gray-700 text-sm">{d.description}</div>
              )}
              <div className="text-gray-500 text-sm">
                {d.clinic} • {d.distance}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 8a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* التقييم والمراجعات */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <span className="text-green-600">👍</span>
              {d.ratingPercent}% {t('ui.ratingLabel')}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              {d.reviewsCount} {t('ui.reviewsLabel')}
            </div>
          </div>

          {/* البادجز */}
          {/* <div className="flex flex-wrap gap-2 mt-3">
                      {d.tags.map((tag : any, index : number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
