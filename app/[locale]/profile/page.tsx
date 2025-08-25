import { currentUser } from "@clerk/nextjs/server";
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaHeart, FaClock } from "react-icons/fa";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  const user = await currentUser();
  const t = await getTranslations('home.profile');
  
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <main className="w-full">
        {/* Container for larger screens */}
        <div className="md:max-w-4xl md:mx-auto lg:max-w-5xl xl:max-w-6xl">
          {/* Profile Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                {user.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-3xl text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.username || 'User'}
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaEnvelope className="text-sm" />
                  {user.emailAddresses[0]?.emailAddress || 'No email'}
                </p>
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <FaEdit className="text-lg" />
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="bg-white mx-4 mt-4 rounded-2xl shadow-sm border border-gray-100 md:mx-6 lg:mx-8">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('accountOverview')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <FaHeart className="text-2xl text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">{t('stats.favouriteDoctors')}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <FaCalendar className="text-2xl text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">{t('stats.appointments')}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <FaClock className="text-2xl text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">{t('stats.pending')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white mx-4 mt-4 rounded-2xl shadow-sm border border-gray-100 md:mx-6 lg:mx-8">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('personalInfo')}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">{t('info.fullName')}</span>
                  <span className="font-medium text-gray-900">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : t('info.notProvided')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">{t('info.email')}</span>
                  <span className="font-medium text-gray-900">
                    {user.emailAddresses[0]?.emailAddress || t('info.notProvided')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">{t('info.phone')}</span>
                  <span className="font-medium text-gray-900">
                    {user.phoneNumbers[0]?.phoneNumber || t('info.notProvided')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">{t('info.memberSince')}</span>
                  <span className="font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">{t('info.accountType')}</span>
                  <span className="font-medium text-blue-600">{t('info.patient')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white mx-4 mt-4 mb-6 rounded-2xl shadow-sm border border-gray-100 md:mx-6 lg:mx-8">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('quickActions')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-4 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="font-medium text-gray-900 mb-1">{t('actions.editProfile.title')}</div>
                  <div className="text-sm text-gray-600">{t('actions.editProfile.description')}</div>
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="font-medium text-gray-900 mb-1">{t('actions.medicalHistory.title')}</div>
                  <div className="text-sm text-gray-600">{t('actions.medicalHistory.description')}</div>
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="font-medium text-gray-900 mb-1">{t('actions.notifications.title')}</div>
                  <div className="text-sm text-gray-600">{t('actions.notifications.description')}</div>
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="font-medium text-gray-900 mb-1">{t('actions.helpSupport.title')}</div>
                  <div className="text-sm text-gray-600">{t('actions.helpSupport.description')}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}