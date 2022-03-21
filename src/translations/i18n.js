import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './en';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { pl } from './pl';

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'pl',
    debug: true,
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en,
      pl,
    },
  });

export default i18n;
