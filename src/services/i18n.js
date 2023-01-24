import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { default as en } from 'locales/en';
import { default as uk } from 'locales/uk';
import API from 'services/API';
import { getCachedLocale, setCachedLocale } from 'services/AsyncStorage';

import { Platform, NativeModules } from 'react-native';

const lng = getSystemLocale().substr(0, 2) == 'en' ? 'en' : 'uk';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
};

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: lng,
  interpolation: {
    escapeValue: false,
  },
});

API.changeLanguage(lng);

if (Platform.OS === 'android') {
  getCachedLocale().then((l) => {
    if (l != 'uk' && l != 'en') {
      setCachedLocale(lng);
    }
  });
}

export default i18n;

function getSystemLocale() {
  let locale: string;
  let locales: string;

  // iOS
  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locales = NativeModules.SettingsManager.settings.AppleLanguages;
    locale = locales.map((l) => l.substr(0, 2)).filter((l) => ['uk', 'en'].includes(l))[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (typeof locale === 'undefined') {
    console.log('Couldnt get locale');
    return 'uk';
  }

  return locale;
}
