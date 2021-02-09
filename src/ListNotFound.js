import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { Icon, Text, Content, Button } from 'native-base';

import NavigationService from './services/NavigationService';

import { activeColor } from './Colors';

export default class ListNotFound extends React.PureComponent {
  inviteFriends = () => NavigationService.navigate('InviteFriendsScreen');

  render() {
    const { refreshControl, fromFeed } = this.props;
    return (
      <Content contentContainerStyle={styles.notFoundContainer} refreshControl={refreshControl}>
        <Icon name="ios-sad" style={styles.notFoundIcon} />
        <Text style={styles.notFoundText}>Пусто</Text>
        {fromFeed && (
          <Button onPress={this.inviteFriends} style={styles.activeColorButton}>
            <Text>Пригласить друзей</Text>
            <Icon name="happy-outline" />
          </Button>
        )}
      </Content>
    );
  }
}

ListNotFound.propTypes = {
  refreshControl: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
  activeColorButton: { backgroundColor: activeColor },
  notFoundIcon: { fontSize: 256, color: activeColor },
  notFoundText: { color: activeColor, marginBottom: 24 },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
