import { StyleSheet } from 'react-native';
import React from 'react';
import { Icon } from 'native-base';

import { disabledColor, activeColor, textColor } from 'colors';

const styles = StyleSheet.create({
  activeIcon: {
    fontSize: 24,
    color: activeColor,
  },
  inactiveIcon: {
    fontSize: 24,
    color: textColor,
  },
  middleIcon: { fontSize: 36 },
});

export default function BottomTabIcon({ name, tintColor }) {
  let style = tintColor === textColor ? styles.inactiveIcon : styles.activeIcon;

  if (name == 'add-circle-sharp') {
    style = [style, styles.middleIcon];
  }

  return <Icon name={name} style={style} />;
}
