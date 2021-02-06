import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { Icon, Text, Content } from 'native-base';

import { activeColor } from './Colors';

export default class ListNotFound extends React.PureComponent {
  render() {
    const { refreshControl } = this.props;
    return (
      <Content contentContainerStyle={styles.notFoundContainer} refreshControl={refreshControl}>
        <Icon name="ios-sad" style={styles.notFoundIcon} />
        <Text style={styles.notFoundText}>Пусто</Text>
      </Content>
    );
  }
}

ListNotFound.propTypes = {
  refreshControl: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
  notFoundIcon: { fontSize: 256, color: activeColor },
  notFoundText: { color: activeColor },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
