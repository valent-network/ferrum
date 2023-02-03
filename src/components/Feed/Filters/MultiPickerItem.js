import React from 'react';
import { View, Text, Icon } from 'native-base';

import styles from './Styles';

import { disabledColor, activeColor } from 'colors';

export default function MultiPickerItem({ filterValue, filterId, onPress, active, iconName }) {
  const maybeActiveStyle = { backgroundColor: active ? activeColor : disabledColor };

  return (
    <View key={filterId} style={active ? styles.activeFilterBox : styles.filterBox}>
      <Text onPress={onPress} style={active ? styles.activeFilterBoxText : styles.filterBoxText}>
        {filterValue}
        &nbsp;
        <Icon name={iconName} style={active ? styles.activeFilterItem : styles.filterItem} />
      </Text>
    </View>
  );
}
