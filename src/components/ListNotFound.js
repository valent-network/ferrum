import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';

import { Icon, Text, Content, Button } from 'native-base';

import { withTranslation } from 'react-i18next';

import Navigation from 'services/Navigation';

import { activeColor, textColor, activeTextColor } from 'colors';

import NOT_FOUND from 'assets/not-found.gif';

class ListNotFound extends React.PureComponent {
  inviteFriends = () => Navigation.navigate('InviteFriendsScreen');

  render() {
    const { t, refreshControl, fromFeed } = this.props;
    return (
      <Content contentContainerStyle={styles.notFoundContainer} refreshControl={refreshControl}>
        <Image style={styles.picture} source={NOT_FOUND} />
        <Text style={styles.notFoundText}>{t('listNotFound')}</Text>
        {fromFeed && (
          <Button onPress={this.inviteFriends} style={styles.inviteFriendsButton}>
            <Text style={{ color: activeTextColor }}>{t('buttons.listNotfoundInviteFriends')}</Text>
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
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
});
