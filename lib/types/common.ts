type supportedLanguage = 'en' | 'ar' ;
export interface LocalizedString {
  translations: Record<supportedLanguage, string>;
}

