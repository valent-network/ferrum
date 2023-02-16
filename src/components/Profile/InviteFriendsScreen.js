import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, Icon, Container, Header, Left, Right, Body } from 'native-base';
import { Share, StyleSheet, Platform, Appearance } from 'react-native';

import { useTranslation } from 'react-i18next';

import UserContactsList from 'components/UserContacts/UserContactsList';

import UsersListItem from './UsersListItem';
import SearchBar from 'components/SearchBar';

import { loadMoreUserContacts, getAll, updateQuery } from 'actions/userContacts';

import { primaryColor, textColor, activeColor, secondaryColor } from 'colors';

import i18n from 'services/i18n';

function InviteFriendsScreen({
  isLoading,
  userContacts,
  loadMoreUserContacts,
  onRefresh,
  query,
  updateQuery,
  resetQuery,
  navigation,
}) {
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

  return (
    <Container style={styles.mainContainer}>
      <Header style={styles.mainHeader} iosBarStyle={iosBarStyle} noShadow={true}>
        <Left style={styles.mainHeaderLeft}>
          <Icon allowFontScaling={true} name={backIconName} style={styles.backButton} onPress={goBack} />
        </Left>
        <Body style={styles.mainHeaderBody}>
          <SearchBar
            placeholder={i18n.t('profile.placeholders.userContactsSearch')}
            backgroundColor={primaryColor}
            query={query}
            onReset={resetQuery}
            isLoading={isLoading}
            onSearch={updateQuery}
          />
        </Body>
        <Right style={styles.mainHeaderRight}>
          <Icon allowFontScaling={true} name="share-outline" style={styles.socialShare} onPress={shareAction} />
        </Right>
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
    query: state.userContacts.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
    updateQuery: (query) => () => dispatch(updateQuery(query)),
    resetQuery: () => dispatch(updateQuery('')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriendsScreen);

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: secondaryColor,
    flexWrap: 'nowrap',
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
  },
  mainHeaderLeft: {
    flex: null,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
    paddingTop: 0,
    marginLeft: Platform.OS === 'android' ? 8 : 0,
    marginRight: 8,
  },
  mainHeaderRight: {
    flex: null,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  mainContainer: { backgroundColor: primaryColor },
  socialShare: {
    alignSelf: 'center',
    color: textColor,
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: Platform.OS === 'android' ? 16 : 8,
    marginRight: 8,
  },
  backButton: {
    color: textColor,
    fontSize: Platform.OS === 'android' ? 24 : 33,
    alignSelf: 'center',
  },
});
