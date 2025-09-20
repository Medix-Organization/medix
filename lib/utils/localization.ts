import { getLocale } from "next-intl/server";

/**
 * Helper function to get localized text based on current locale
 * @param localizedString - The localized string object with translations
 * @param fallback - Fallback text if no translation is found
 * @returns The localized text string
 */
export async function getLocalizedText(localizedString: any, fallback = "N/A"): Promise<string> {
  if (!localizedString) return fallback;
  if (typeof localizedString === 'string') return localizedString;
  
  const locale = await getLocale();
  
  // Check if it has translations object
  if (localizedString.translations) {
    // First try current locale, then fallback to other language, then fallback text
    if (locale === 'ar' && localizedString.translations.ar) {
      return localizedString.translations.ar;
    } else if (locale === 'en' && localizedString.translations.en) {
      return localizedString.translations.en;
    } else if (localizedString.translations.ar) {
      return localizedString.translations.ar;
    } else if (localizedString.translations.en) {
      return localizedString.translations.en;
    }
  }
  
  return fallback;
}

/**
 * Synchronous version for client components that already have locale
 * @param localizedString - The localized string object with translations
 * @param locale - Current locale ('en' or 'ar')
 * @param fallback - Fallback text if no translation is found
 * @returns The localized text string
 */
export function getLocalizedTextSync(localizedString: any, locale: string, fallback = "N/A"): string {
  if (!localizedString) return fallback;
  if (typeof localizedString === 'string') return localizedString;
  
  // Check if it has translations object
  if (localizedString.translations) {
    // First try current locale, then fallback to other language, then fallback text
    if (locale === 'ar' && localizedString.translations.ar) {
      return localizedString.translations.ar;
    } else if (locale === 'en' && localizedString.translations.en) {
      return localizedString.translations.en;
    } else if (localizedString.translations.ar) {
      return localizedString.translations.ar;
    } else if (localizedString.translations.en) {
      return localizedString.translations.en;
    }
  }
  
  return fallback;
}