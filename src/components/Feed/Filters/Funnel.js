import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

import { FILTER_MODAL_SWITCH_VISIBILITY } from 'actions/types';

import styles from './Styles';

const Funnel = ({ filtersPresent, switchModalVisible }) => (
  <TouchableOpacity activeOpacity={1} onPress={switchModalVisible}>
    <View style={styles.filterBox}>
      <Icon allowFontScaling={true} name={filtersPresent ? 'funnel' : 'funnel-outline'} style={styles.filterIcon} />
    </View>
  </TouchableOpacity>
);

function mapStateToProps(state) {
  return {
    filtersPresent: Object.values(state.filters).filter((f) => f.length > 0).length > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchModalVisible: () => dispatch({ type: FILTER_MODAL_SWITCH_VISIBILITY }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Funnel);
