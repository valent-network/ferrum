import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, Icon } from 'native-base';
import { Share, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import UserContactsList from 'components/UserContacts/UserContactsList';

import UsersListItem from './UsersListItem';

import { loadMoreUserContacts, getAll } from 'actions/userContacts';

import { primaryColor, lightColor, activeColor, secondaryColor } from 'colors';

import i18n from 'services/i18n';

function InviteFriendsScreen({ isLoading, userContacts, loadMoreUserContacts, onRefresh }) {
  const renderItem = ({ item, index }) => <UsersListItem contact={item} />;

  return (
    <UserContactsList
      userContacts={userContacts}
      isLoading={isLoading}
      loadMoreUserContacts={loadMoreUserContacts}
      onRefresh={onRefresh}
      renderItem={renderItem}
    />
  );
}

InviteFriendsScreen.navigationOptions = ({ navigation }) => {
  shareAction = () => {
    Share.share({
      message: i18n.t('profile.shareMessage'),
      title: i18n.t('profile.shareTitle'),
    });
  };

  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      borderWidth: 0,
      borderBottomColor: primaryColor,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTitle: i18n.t('nav.titles.inviteFriends'),
    headerTitleStyle: { color: lightColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: lightColor,
    headerRight: () => <Icon name="share-outline" style={styles.socialShare} onPress={shareAction} />,
  };
};

function mapStateToProps(state) {
  return {
    userContacts: state.userContacts.list.filter((u) => !u.user),
    isLoading: state.userContacts.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriendsScreen);

const styles = StyleSheet.create({
  socialShare: {
    marginRight: 16,
    alignSelf: 'center',
    fontSize: 24,
    color: activeColor,
  },
});
