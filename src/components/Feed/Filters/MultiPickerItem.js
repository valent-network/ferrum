import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Icon } from 'native-base';

import styles from './Styles';

import { disabledColor, activeColor } from 'colors';

export default function MultiPickerItem({ filterValue, filterId, onPress, active, iconName }) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View key={filterId} style={active ? styles.activeFilterBox : styles.filterBox}>
        <Text style={active ? styles.activeFilterBoxText : styles.filterBoxText}>{`${filterValue} `}</Text>
        <Icon allowFontScaling={true} name={iconName} style={active ? styles.activeFilterItem : styles.filterItem} />
      </View>
    </TouchableOpacity>
  );
}
