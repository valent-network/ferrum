import { Linking } from 'react-native';

export const notification = { ref: {} };

export const goToSettings = () => Linking.openURL('app-settings:');
export const onTosPress = () => Linking.openURL('https://recar.io/tos.html');
export const onPrivacyPress = () => Linking.openURL('https://recar.io/privacy.html');

export function mergeArraysKeepNew(data, key) {
  return [
    ...new Map(
      data.map(x => [key(x), x])
    ).values()
  ]
};
