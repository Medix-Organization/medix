import { getTranslations } from "next-intl/server";
import {
  FaUserMd,
  FaSearch,
  FaHospital,
  FaCalendarAlt,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import { MdVerified, MdDashboard } from "react-icons/md";
import { Link } from "@/i18n/navigation";

export default async function ProvidersPage() {
  const t = await getTranslations("providers");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="text-green-600">Healthcare Providers</span>{" "}
            <span>Platform</span>
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
            Join Medix as a healthcare provider and connect with patients who need your expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href="/sign-in?role=doctor"
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors text-center flex items-center justify-center gap-2"
            >
              <FaUserMd className="text-lg" />
              Doctor Sign In
            </Link>
            <Link
              href="/sign-in?role=clinic"
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors text-center flex items-center justify-center gap-2"
            >
              <FaHospital className="text-lg" />
              Clinic Sign In
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-3">New to Medix?</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              <Link
                href="/doctor/sign-up"
                className="text-green-600 hover:text-green-700 font-medium underline"
              >
                Register as Doctor
              </Link>
              <Link
                href="/clinic/sign-up"
                className="text-green-600 hover:text-green-700 font-medium underline"
              >
                Register as Clinic
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Healthcare Providers Choose Medix?
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Grow your practice and provide better patient care with our comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaSearch className="text-blue-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Increased Visibility
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get discovered by patients actively searching for your specialty and services
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <MdVerified className="text-green-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Verified Credentials
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Build trust with patients through our verified professional credential system
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaCalendarAlt className="text-purple-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Appointment Management
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Streamline your scheduling with our integrated appointment booking system
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-yellow-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <MdDashboard className="text-yellow-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Practice Dashboard
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Manage your practice efficiently with comprehensive analytics and insights
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-red-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaShieldAlt className="text-red-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Secure Platform
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                HIPAA-compliant platform ensuring patient data security and privacy
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white text-center p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaClock className="text-indigo-600 text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                24/7 Support
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get dedicated support to help you maximize your presence on our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-8 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to Join Medix?
          </h2>
          <p className="text-base sm:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Start connecting with patients and growing your practice today
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/doctor/sign-up"
              className="inline-block bg-white text-green-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors"
            >
              Join as Doctor
            </Link>
            <Link
              href="/clinic/sign-up"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors"
            >
              Join as Clinic
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}