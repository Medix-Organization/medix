import { getTranslations } from "next-intl/server";
import { FaUserMd, FaSearch, FaStar, FaShieldAlt, FaClock, FaHeart } from "react-icons/fa";
import { MdVerified, MdRateReview } from "react-icons/md";
import Link from "next/link";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('landing.hero.title').split(' ').map((word, index) => {
              if (word === 'Doctors' || word === 'Patients' || word === 'الأطباء' || word === 'بالمرضى') {
                return <span key={index} className="text-blue-600">{word} </span>;
              }
              return word + ' ';
            })}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
            {t('landing.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              {t('landing.hero.findDoctorBtn')}
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              {t('landing.hero.joinDoctorBtn')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('landing.features.easyDiscovery.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.easyDiscovery.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdVerified className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('landing.features.verifiedReviews.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.verifiedReviews.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('landing.features.trustedProfessionals.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.trustedProfessionals.description')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('landing.features.rateReview.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.rateReview.description')}
              </p>
            </div>

            {/* Feature 5 */}
            {/* <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quick Appointments
              </h3>
              <p className="text-gray-600">
                Book appointments instantly and manage your healthcare schedule with ease
              </p>
            </div> */}

            {/* Feature 6 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('landing.features.patientCentered.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.patientCentered.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('landing.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('landing.cta.subtitle')}
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            {t('landing.cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
}
