import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { default as en } from 'locales/en';
import { default as uk } from 'locales/uk';
import API from 'services/API';
import { getCachedLocale, setCachedLocale } from 'services/AsyncStorage';

import { Platform, NativeModules } from 'react-native';

// if system locale is english, we use english
// otherwise we always use uk locale
// at the moment because we don't have others
const systemLocale = getSystemLocale().substr(0, 2) == 'en' ? 'en' : 'uk';

if (Platform.OS === 'android') {
  getCachedLocale().then((cachedLocale) => {
    if (cachedLocale != 'uk' && cachedLocale != 'en') {
      // Not setup yet
      setCachedLocale(systemLocale);
      setAppLocale(systemLocale);
    } else {
      // There is a cached locale already
      setAppLocale(cachedLocale);
    }
  });
} else {
  // We don't cache locale on iOS, its taken care by OS
  setAppLocale(systemLocale);
}

export default i18n;

function setAppLocale(locale) {
  const resources = {
    en: { translation: en },
    uk: { translation: uk },
  };

  i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    lng: locale,
    interpolation: {
      escapeValue: false,
    },
  });

  API.changeLanguage(locale);
}

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
