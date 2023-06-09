import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Text } from 'native-base';

import styles from './Styles';

import MultiPickerItem from './MultiPickerItem';

import { applyFilter } from 'actions/feed';

function MultiPicker({ filters, applyFilter, localized_name, name, values }) {
  const activeFilters = filters[name] || [];
  const mapper = useCallback(
    (filterValue) => {
      const onPress = useCallback(() => applyFilter(name, filterValue), [name]);
      const active = activeFilters.filter((f) => f == filterValue.id).length === 1;
      const iconName =
        activeFilters.filter((f) => f == filterValue.id).length === 1 ? 'checkmark-circle-outline' : 'ellipse-outline';

      return (
        <MultiPickerItem
          key={`filter-${filterValue.id}`}
          filterValue={filterValue.name}
          filterId={filterValue.id}
          onPress={onPress}
          active={active}
          iconName={iconName}
        />
      );
    },
    [applyFilter, name, activeFilters],
  );

  return (
    <View>
      {!!localized_name && <Text style={styles.filterTitle}>{localized_name}</Text>}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {values.sort((a, b) => a.position - b.position).map(mapper)}
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applyFilter: (filterKey, filterValue) => dispatch(applyFilter(filterKey, filterValue)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiPicker);
