import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hu from './hu.json';
import ro from './ro.json';
import en from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      hu: { translation: hu },
      ro: { translation: ro },
      en: { translation: en },
    },
    lng: 'hu', // alapértelmezett nyelv
    fallbackLng: 'hu',
    interpolation: { escapeValue: false },
  });

export default i18n;
