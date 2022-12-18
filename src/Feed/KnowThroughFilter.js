import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { View, Text, Icon, H2 } from 'native-base';

import { useTranslation } from 'react-i18next';

import { activeColor, lightColor, secondaryColor, disabledColor } from '../Colors';

import { applyFilter, resetFilters } from './feedActions';

function KnowThroughFilter({ applyFilter, filters, filtersValues }) {
  const { t } = useTranslation()
  const filterBox = (filterValue, filterType) => {
    const isActive = filters[filterType].filter((f) => f === filterValue).length;
    const maybeActiveStyle = { backgroundColor: isActive ? activeColor : disabledColor };
    const iconName = filters[filterType].filter((f) => f === filterValue).length
      ? 'checkmark-circle-outline'
      : 'ellipse-outline';
    const filterBoxHopsCount = (filterValue, index) => filterBox(filterValue, 'hops_count');

    return (
      <View key={filterValue} style={isActive ? styles.activeFilterBox : styles.filterBox}>
        <Text onPress={() => applyFilter(filterType, filterValue)} style={styles.filterBoxText}>
          {filterValue}
          &nbsp;
          <Icon name={iconName} style={styles.filterItem} />
        </Text>
      </View>
    );
  };

  return (
    <View style={{paddingVertical: 12, paddingHorizontal: 6}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
      <H2 style={styles.filterTitle}>{t('feed.filters.headers.knowThrough')}:</H2>
        {filtersValues.hops_count.map((filterValue, index) => filterBox(filterValue, 'hops_count'))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    filterItem: {
      fontSize: 18,
      color: lightColor,
    },
    filterBox: {
      borderColor: activeColor,
      borderWidth: 0.2,
      borderRadius: 2,
      marginRight: 12,
      padding: 6,
      flexDirection: 'row',
      backgroundColor: secondaryColor,
    },
    filterBoxText: {
      color: lightColor,
    },
    activeFilterBox: {
      borderColor: lightColor,
      borderWidth: 1,
      borderRadius: 2,
      marginRight: 12,
      padding: 6,
      flexDirection: 'row',
      backgroundColor: activeColor,
    },
    filterTitle: {
      paddingRight: 6,
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf: 'center'
    }
})

function mapStateToProps(state) {
  return {
    filtersValues: state.filtersValues,
    filters: state.filters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applyFilter: (filterKey, filterValue) => dispatch(applyFilter(filterKey, filterValue)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KnowThroughFilter);