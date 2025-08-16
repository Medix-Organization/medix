import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const DoctorCard = async (d: any) => {
  const t = await getTranslations("home");
  console.log(d);

  return (
    <Link href={`/doctor-profile/${d.d.id}`} key={d.id} className="block">
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer mx-2 sm:mx-0">
        <div className="flex items-start gap-3 sm:gap-4">
          <Image
            width={56}
            height={56}
            src={`/${d.d.avatar}`}
            alt={"d.name"}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm sm:text-base truncate">{d.d.name}</div>
                <div className="text-xs sm:text-sm text-blue-600 truncate">{d.d.role}</div>
                {d.description && (
                  <div className="text-gray-700 text-xs sm:text-sm mt-1 line-clamp-2">{d.d.description}</div>
                )}
                <div className="text-gray-500 text-xs sm:text-sm mt-1 truncate">
                  {d.d.clinic} • {d.d.distance}
                </div>
              </div>
            </div>

            {/* التقييم والمراجعات */}
            <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <span className="text-green-600">👍</span>
                <span className="truncate">{d.ratingPercent}% {t("ui.ratingLabel")}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="truncate">{d.reviewsCount} {t("ui.reviewsLabel")}</span>
              </div>
            </div>

            {/* البادجز */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
              {d.d.tags.slice(0, 3).map((tag: any, index: number) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              {d.d.tags.length > 3 && (
                <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  +{d.d.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
