import { getTranslations } from "next-intl/server";
import {
  FaUserMd,
  FaSearch,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaHeart,
  FaHospital,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdVerified, MdRateReview } from "react-icons/md";
import { Link } from "@/i18n/navigation";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t("landing.hero.title")
              .split(" ")
              .map((word, index) => {
                if (
                  word === "Doctors" ||
                  word === "Patients" ||
                  word === "الأطباء" ||
                  word === "بالمرضى"
                ) {
                  return (
                    <span key={index} className="text-blue-600">
                      {word}{" "}
                    </span>
                  );
                }
                return word + " ";
              })}
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
            {t("landing.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href="/home"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors text-center"
            >
              {t("landing.hero.findDoctorBtn")}
            </Link>
            <Link
              href="/sign-up?role=doctor"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors text-center"
            >
              {t("landing.hero.joinDoctorBtn")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t("landing.features.title")}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              {t("landing.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaSearch className="text-blue-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {t("landing.features.easyDiscovery.title")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t("landing.features.easyDiscovery.description")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <MdVerified className="text-green-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {t("landing.features.verifiedReviews.title")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t("landing.features.verifiedReviews.description")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaCalendarAlt className="text-purple-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {t("landing.features.easyBooking.title")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t("landing.features.easyBooking.description")}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-yellow-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaUserMd className="text-yellow-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {t("landing.features.doctorProfile.title")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t("landing.features.doctorProfile.description")}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-red-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaHospital className="text-red-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {t("landing.features.clinicManagement.title")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t("landing.features.clinicManagement.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-8 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t("landing.cta.title")}
          </h2>
          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            {t("landing.cta.subtitle")}
          </p>
          <Link
            href="/home"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors"
          >
            {t("landing.cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
