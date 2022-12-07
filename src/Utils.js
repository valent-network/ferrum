import { Platform, Linking } from 'react-native';

import i18n from '../i18n';

export const notification = { ref: {} };

export const goToSettings = () => Linking.openURL('app-settings:');
export const onTosPress = () => Linking.openURL('https://recar.io/tos.html');
export const onPrivacyPress = () => Linking.openURL('https://recar.io/privacy.html');
export const onReferralInfoPress = () => Linking.openURL('https://recar.io/network');

export function mergeArraysKeepNew(data, key) {
  return [...new Map(data.map((x) => [key(x), x])).values()];
}

let decCache = [],
  decCases = [2, 0, 1, 1, 1, 2];

export function decOfNum(number, titles) {
  if (!decCache[number])
    decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
  return titles[decCache[number]];
}

export function invitationalSMS(phoneNumber, message) {
  const paramValue = Platform.OS === 'ios' ? '&' : '?';
  const url = `sms:${phoneNumber}${paramValue}body=${message}`;

  Linking.openURL(url);
}

export function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function localizedSystemMessage(message) {
  const { text, extra: { type, name } } = message;
  let localizedText;

  switch(type) {
    case "init":
      localizedText = `${name} ${i18n.t('chat.system.init')}`
      break;
    case "left":
      localizedText = `${name} ${i18n.t('chat.system.left')}`
      break;
    case "add":
      localizedText = `${name} ${i18n.t('chat.system.add')}`
      break;
  }

  return localizedText || message.text;
}