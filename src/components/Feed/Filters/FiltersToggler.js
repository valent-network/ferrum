import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { useTranslation } from 'react-i18next';

import { FILTER_MODAL_SWITCH_VISIBILITY } from 'actions/types';

import { textColor, activeColor } from 'colors';

const FiltersToggler = ({ filtersPresent, switchModalVisible }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity activeOpacity={1} style={styles.mainContainer} onPress={switchModalVisible}>
      <Text style={styles.text}>{t('feed.filters.headers.main')}</Text>
      {filtersPresent && <Icon name="ellipse" style={styles.filtersPresentIcon} />}
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  const searchFilters = (({ query, hops_count, ...o }) => o)(state.filters);

  return {
    filtersPresent: Object.values(searchFilters).filter((f) => f.length > 0).length > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchModalVisible: () => dispatch({ type: FILTER_MODAL_SWITCH_VISIBILITY }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersToggler);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 8,
  },
  text: { color: textColor },
  filtersPresentIcon: { color: activeColor, fontSize: 8, marginLeft: 2 },
});
