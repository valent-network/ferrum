import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { Icon, Text, Content, Button } from 'native-base';

import { withTranslation } from 'react-i18next';

import NavigationService from './services/NavigationService';

import { activeColor } from './Colors';

class ListNotFound extends React.PureComponent {
  inviteFriends = () => NavigationService.navigate('InviteFriendsScreen');

  render() {
    const { t, refreshControl, fromFeed } = this.props;
    return (
      <Content contentContainerStyle={styles.notFoundContainer} refreshControl={refreshControl}>
        <Icon name="ios-sad" style={styles.notFoundIcon} />
        <Text style={styles.notFoundText}>{t('listNotFound')}</Text>
        {fromFeed && (
          <Button onPress={this.inviteFriends} style={styles.inviteFriendsButton}>
            <Icon name="happy-outline" />
            <Text>{t('buttons.listNotfoundInviteFriends')}</Text>
            <Icon name="happy-outline" />
          </Button>
        )}
      </Content>
    );
  }
}

export default withTranslation()(ListNotFound);

ListNotFound.propTypes = {
  refreshControl: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
  inviteFriendsButton: { backgroundColor: activeColor, alignSelf: 'center' },
  notFoundIcon: { fontSize: 256, color: activeColor },
  notFoundText: { color: activeColor, marginBottom: 24 },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
