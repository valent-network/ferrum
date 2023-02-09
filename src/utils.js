import React, { useState, useRef, useCallback } from 'react';
import { Platform, Linking, Animated, Appearance } from 'react-native';

import i18n from 'services/i18n';

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
  const {
    text,
    extra: { type, name },
  } = message;
  let localizedText;

  switch (type) {
    case 'init':
      localizedText = `${name} ${i18n.t('chat.system.init')}`;
      break;
    case 'left':
      localizedText = `${name} ${i18n.t('chat.system.left')}`;
      break;
    case 'add':
      localizedText = `${name} ${i18n.t('chat.system.add')}`;
      break;
  }

  return localizedText || message.text;
}

export const reposition = (i, index) => {
  return { ...i, position: index };
};

export const positionSorter = (a, b) => a.position - b.position;

export const AD_IMAGE_HEIGHT = 350;

export function withAnimated(WrappedComponent) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithAnimated extends React.Component {
    static displayName = `WithAnimated(${displayName})`;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Animated.createAnimatedComponent(WithAnimated);
}

function animatedHeaderStyles(scrolling, headerHeight) {
  const systemColorScheme = Appearance.getColorScheme();
  const fullVisibleHeaderY = AD_IMAGE_HEIGHT - headerHeight - 5;
  const bgColorsOutputRange =
    systemColorScheme === 'light'
      ? ['rgba(0,0,0,0)', 'rgba(120,120,120,0.5)', 'rgba(241,241,241,1)']
      : ['rgba(255,255,255,0)', 'rgba(120,120,120,0.5)', 'rgba(0,0,0,1)'];
  const textColorsOutputRange =
    systemColorScheme === 'light' ? ['rgb(214,241,241)', 'rgb(31,31,31)'] : ['rgb(214,241,241)', 'rgb(239,239,239)'];

  const bgInterpolation = scrolling.interpolate({
    inputRange: [fullVisibleHeaderY * 0.75, fullVisibleHeaderY * 0.9, fullVisibleHeaderY],
    outputRange: bgColorsOutputRange,
  });

  const textInterpolation = scrolling.interpolate({
    inputRange: [fullVisibleHeaderY * 0.5, fullVisibleHeaderY],
    outputRange: textColorsOutputRange,
  });

  return [bgInterpolation, textInterpolation];
}

export function animateHeaderHelper() {
  const scrolling = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrolling,
          },
        },
      },
    ],
    { useNativeDriver: false },
  );
  const [headerHeight, setHeaderHeight] = useState(100);

  const [bgInterpolation, textInterpolation] = useCallback(animatedHeaderStyles(scrolling, headerHeight), [
    scrolling,
    headerHeight,
  ]);
  const setCalculatedHeaderHeight = useCallback((event) => setHeaderHeight(event.nativeEvent.layout.height), []);

  return [onScroll, setCalculatedHeaderHeight, bgInterpolation, textInterpolation];
}
