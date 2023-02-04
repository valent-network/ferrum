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
});

export default function BottomTabIcon({ name, tintColor }) {
  let style = tintColor === textColor ? styles.inactiveIcon : styles.activeIcon;

  if (name == 'add-circle-sharp') {
    style = [style, { marginTop: -6, fontSize: 48 }];
  }

  return <Icon name={name} style={style} />;
}
