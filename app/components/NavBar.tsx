import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ToggleLanguageButton from "./ToggleLanguageButton";

const NavBar = async () => {

  const t = await getTranslations('home.navbar');


  return (
    <nav className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tight">MEDIX</span>
        <div className="hidden md:flex gap-6 text-gray-600">
          <Link href="#">{t('links.home')}</Link>
          <Link href="#">{t('links.services')}</Link>
          <Link href="#">{t('links.contact')}</Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="border rounded-lg px-3 py-1 text-sm"
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">
          {t('signIn')}
        </button>
        <ToggleLanguageButton />
      </div>
    </nav>
  );
};

export default NavBar;
