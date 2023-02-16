import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Item, Icon, Input, Text, Left, Body, Right } from 'native-base';
import { StyleSheet, Platform, Appearance } from 'react-native';

import Navigation from 'services/Navigation';

import UserContactsList from './UserContactsList';
import UserContactsListItem from './UserContactsListItem';
import SearchBar from 'components/SearchBar';

import { loadMoreUserContacts, getAll, toggleBlock, updateQuery } from 'actions/userContacts';

import { filterByContact } from 'actions/feed';

import { primaryColor, secondaryColor, textColor } from 'colors';

import i18n from 'services/i18n';

class UserContactsScreen extends React.PureComponent {
  renderItem = ({ item, index }) => (
    <UserContactsListItem
      contact={item}
      filterByContact={this.props.filterByContact}
      toggleBlock={this.props.toggleBlock}
    />
  );

  goBack = () => Navigation.navigate('ProfileScreen');
  backIconName = Platform.OS === 'android' ? 'arrow-back-outline' : 'chevron-back-outline';
  iosBarStyle = Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content';

  render() {
    const {
      userContacts,
      isLoading,
      query,
      updateQuery,
      resetQuery,
      loadMoreUserContacts,
      onRefresh,
      filterByContact,
    } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <Header style={styles.mainHeader} iosBarStyle={this.iosBarStyle} noShadow={true}>
          <Left style={styles.mainHeaderLeft}>
            <Icon name={this.backIconName} style={styles.backButton} onPress={this.goBack} />
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
          <Right style={styles.mainHeaderRight}></Right>
        </Header>
        <UserContactsList
          userContacts={userContacts}
          isLoading={isLoading}
          loadMoreUserContacts={loadMoreUserContacts}
          onRefresh={onRefresh}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userContacts: state.userContacts.list,
    isLoading: state.userContacts.isLoading,
    query: state.userContacts.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
    filterByContact: (name) => dispatch(filterByContact(name)),
    toggleBlock: (userContactId) => dispatch(toggleBlock(userContactId)),
    updateQuery: (query) => () => dispatch(updateQuery(query)),
    resetQuery: () => dispatch(updateQuery('')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContactsScreen);

UserContactsScreen.propTypes = {};

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
  mainHeaderBody: { height: '100%', justifyContent: 'center', marginRight: 16 },
  mainContainer: { backgroundColor: primaryColor },
  backButton: {
    color: textColor,
    fontSize: Platform.OS === 'android' ? 24 : 33,
    alignSelf: 'center',
  },
});
