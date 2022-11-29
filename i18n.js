import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { default as en } from './locales/en'
import { default as ua } from './locales/ua'

//empty for now
const resources = {
  en: {
    translation: en
  },
  ua: {
    translation: ua
  }
};

i18n.use(initReactI18next).init({
  resources,
  //language to use if translations in user language are not available
  fallbackLng: "en",
  lng: "ua",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
