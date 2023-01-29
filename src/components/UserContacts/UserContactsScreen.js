import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Item, Icon, Input, Text, Left, Right } from 'native-base';
import { StyleSheet, Platform } from 'react-native';
import { withTranslation } from 'react-i18next';

import Navigation from 'services/Navigation';

import UserContactsList from './UserContactsList';
import UserContactsListItem from './UserContactsListItem';

import { loadMoreUserContacts, getAll, updateQuery, toggleBlock } from 'actions/userContacts';

import { filterByContact } from 'actions/feed';
import PermissionsBox from 'components/Feed/PermissionsBox';

import { primaryColor, secondaryColor, lightColor, disabledColor } from 'colors';

class UserContactsScreen extends React.PureComponent {
  typingTimer = null;

  renderItem = ({ item, index }) => (
    <UserContactsListItem
      contact={item}
      filterByContact={this.props.filterByContact}
      toggleBlock={this.props.toggleBlock}
    />
  );

  resetQuery = () => this.props.updateQuery('');

  render() {
    const { t, userContacts, isLoading, query, updateQuery, loadMoreUserContacts, onRefresh, filterByContact } =
      this.props;
    const onUpdateQuery = (query) => {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => updateQuery(query), 200);
    };

    return (
      <Container>
        <Header style={styles.mainHeader} iosBarStyle="light-content" noShadow={true} searchBar>
          <Icon
            name="chevron-back-outline"
            style={styles.backButton}
            onPress={() => Navigation.navigate('ProfileScreen')}
          />

          <Item style={styles.searchBar}>
            <Icon name="ios-search" style={styles.searchIcon} />
            <Input
              placeholder={t('profile.placeholders.userContactsSearch')}
              placeholderTextColor={disabledColor}
              style={[styles.inputTextColor, styles.searchBarInput]}
              onChangeText={onUpdateQuery}
              defaultValue={query}
              returnKeyType={'done'}
            />
            {query.length > 0 && <Icon name="close-circle" style={styles.inputTextColor} onPress={this.resetQuery} />}
          </Item>
        </Header>
        <UserContactsList
          userContacts={userContacts}
          isLoading={isLoading}
          loadMoreUserContacts={loadMoreUserContacts}
          onRefresh={onRefresh}
          renderItem={this.renderItem}
        />
        <PermissionsBox />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userContacts: state.userContacts.list,
    query: state.userContacts.query,
    isLoading: state.userContacts.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
    filterByContact: (name) => dispatch(filterByContact(name)),
    updateQuery: (query) => dispatch(updateQuery(query)),
    toggleBlock: (userContactId) => dispatch(toggleBlock(userContactId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserContactsScreen));

UserContactsScreen.propTypes = {};

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: secondaryColor,
    borderBottomWidth: 0,
    padding: 0,
    paddingLeft: 0,
    margin: 0,
    paddingBottom: Platform.OS === 'android' ? 8 : 0,
    alignItems: 'center',
  },
  searchBar: {
    borderRadius: 16,
    backgroundColor: primaryColor,
    marginTop: Platform.OS === 'android' ? 32 : 0,
    alignSelf: Platform.OS === 'android' ? 'flex-end' : 'center',
  },
  searchIcon: {
    color: disabledColor,
    fontSize: 14,
  },
  searchBarInput: {
    fontSize: 14,
    paddingLeft: 0,
  },
  inputTextColor: {
    color: lightColor,
  },
  backButton: { fontSize: Platform.OS === 'android' ? 24 : 33 },
});
