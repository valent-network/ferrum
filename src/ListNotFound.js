import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Text, Content } from 'native-base';

import { feed as styles } from './Styles';

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
