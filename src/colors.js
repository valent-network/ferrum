import { StyleSheet, Appearance } from 'react-native';

const systemColorScheme = Appearance.getColorScheme();

export const primaryColor = systemColorScheme === 'dark' ? '#000' : '#fff';
export const secondaryColor = systemColorScheme === 'dark' ? '#1f1f1f' : '#f1f1f1';
export const textColor = systemColorScheme === 'dark' ? '#efefef' : '#121212';
export const activeColor = systemColorScheme === 'dark' ? '#0057B8' : '#0057B8';
export const activeTextColor = systemColorScheme === 'dark' ? '#efefef' : '#F7F7F7';
export const superActiveColor = systemColorScheme === 'dark' ? '#FFDD00' : '#FFDD00';
export const activeBorderColor = systemColorScheme === 'dark' ? '#efefef' : '#121212';
export const disabledColor = systemColorScheme === 'dark' ? '#aaa' : '#bbb';

//

export const spinnerColor = activeColor;
export const deletedColor = '#d43';
export const errorColor = '#d43';
export const priceColor = '#85bb65';

//

export const trackColor = { true: activeColor, false: secondaryColor };
