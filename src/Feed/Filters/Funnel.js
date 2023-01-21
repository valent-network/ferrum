import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

import { FILTER_MODAL_SWITCH_VISIBILITY } from '../../actions/actionTypes';

import styles from './Styles';

const Funnel = ({filtersPresent, switchModalVisible}) => (
  <View style={styles.filterBox}>
    <TouchableOpacity activeOpacity={1} onPress={switchModalVisible}>
      <Icon name={filtersPresent ? 'funnel' : 'funnel-outline'} style={styles.filterIcon} />
    </TouchableOpacity>
  </View>
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
