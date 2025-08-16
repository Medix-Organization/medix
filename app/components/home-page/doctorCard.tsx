import { getTranslations } from "next-intl/server";
import Image from "next/image";

const DoctorCard = async (d: any) => {
  const t = await getTranslations("home");
  console.log(d);

  return (
    <div key={d.id} className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-start gap-4">
        <Image
          width={56}
          height={56}
          src={`/${d.d.avatar}`}
          alt={"d.name"}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{d.d.name}</div>
              <div className="text-sm text-blue-600">{d.d.role}</div>
              {d.description && (
                <div className="text-gray-700 text-sm">{d.d.description}</div>
              )}
              <div className="text-gray-500 text-sm">
                {d.d.clinic} • {d.d.distance}
              </div>
            </div>
            <div className="flex items-center gap-3"></div>
          </div>

          {/* التقييم والمراجعات */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <span className="text-green-600">👍</span>
              {d.ratingPercent}% {t("ui.ratingLabel")}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              {d.reviewsCount} {t("ui.reviewsLabel")}
            </div>
          </div>

          {/* البادجز */}
          <div className="flex flex-wrap gap-2 mt-3">
            {d.d.tags.map((tag: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
