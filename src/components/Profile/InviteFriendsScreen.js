import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, Icon, Container, Header } from 'native-base';
import { Share, StyleSheet, Platform, Appearance } from 'react-native';

import { useTranslation } from 'react-i18next';

import UserContactsList from 'components/UserContacts/UserContactsList';

import UsersListItem from './UsersListItem';
import SearchBar from 'components/UserContacts/SearchBar';

import { loadMoreUserContacts, getAll } from 'actions/userContacts';

import { primaryColor, textColor, activeColor, secondaryColor } from 'colors';

import i18n from 'services/i18n';

function InviteFriendsScreen({ isLoading, userContacts, loadMoreUserContacts, onRefresh, navigation }) {
  goBack = () => navigation.navigate('ProfileScreen');
  backIconName = Platform.OS === 'android' ? 'arrow-back-outline' : 'chevron-back-outline';
  iosBarStyle = Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content';
  const renderItem = ({ item, index }) => <UsersListItem contact={item} />;
  const shareAction = () => {
    Share.share({
      message: i18n.t('profile.shareMessage'),
      title: i18n.t('profile.shareTitle'),
    });
  };
  <Icon name="share-outline" style={styles.socialShare} onPress={shareAction} />;

  return (
    <Container style={styles.mainContainer}>
      <Header style={styles.mainHeader} iosBarStyle={iosBarStyle} noShadow={true} searchBar>
        <Icon allowFontScaling={true} name={backIconName} style={styles.backButton} onPress={goBack} />
        <SearchBar />
        <Icon allowFontScaling={true} name="share-outline" style={styles.socialShare} onPress={shareAction} />
      </Header>
      <UserContactsList
        userContacts={userContacts}
        isLoading={isLoading}
        loadMoreUserContacts={loadMoreUserContacts}
        onRefresh={onRefresh}
        renderItem={renderItem}
      />
    </Container>
  );
}

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
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 24 : 33,
    color: activeColor,
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingBottom: 0,
    paddingTop: 0,
  },
  mainHeader: {
    backgroundColor: secondaryColor,
    borderBottomWidth: 0,
    padding: 0,
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
    margin: 0,
    paddingBottom: Platform.OS === 'android' ? 8 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  mainContainer: { backgroundColor: primaryColor },
  backButton: {
    color: textColor,
    fontSize: Platform.OS === 'android' ? 24 : 33,
    alignSelf: 'center',
  },
});
