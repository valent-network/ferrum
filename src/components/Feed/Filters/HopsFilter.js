import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { activeBorderColor, activeColor, secondaryColor, activeTextColor, primaryColor } from 'colors';

export default function HopsFilter({ hopsCount, onPress }) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.mainContainer}>
      <View key={'hopsCountF'} style={[hopsCount >= 0 ? styles.activeFilterBox : styles.filterBox]}>
        <Text style={hopsCount >= 0 ? activeHandStyle : handStyle}>🤝</Text>
        <Text style={hopsCount >= 1 ? activeHandStyle : handStyle}>🤝</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: { zIndex: 100000, marginRight: 0, position: 'absolute', bottom: 8, right: 0, zIndex: 1000 },
  activeFilterBox: {
    borderColor: activeTextColor,
    borderWidth: 1,
    borderRadius: 32,
    padding: 8,
    backgroundColor: activeColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  filterBox: {
    borderColor: activeTextColor,
    borderWidth: 1,
    borderRadius: 32,
    padding: 8,
    backgroundColor: activeColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeFilterBoxText: {
    color: activeTextColor,
    fontSize: 18,
  },
  baseHand: { fontSize: 12, lineHeight: 36, paddingHorizontal: Platform.OS === 'android' ? 1 : 0, opacity: 0.5 },
});

const activeHandStyle = [styles.filterBoxText, styles.baseHand, { opacity: 1 }];
const handStyle = [styles.filterBoxText, styles.baseHand];
