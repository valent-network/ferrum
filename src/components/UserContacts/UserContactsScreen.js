import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Item, Icon, Input, Text, Left, Right } from 'native-base';
import { StyleSheet, Platform, Appearance } from 'react-native';

import Navigation from 'services/Navigation';

import UserContactsList from './UserContactsList';
import UserContactsListItem from './UserContactsListItem';
import SearchBar from './SearchBar';

import { loadMoreUserContacts, getAll, toggleBlock } from 'actions/userContacts';

import { filterByContact } from 'actions/feed';
import PermissionsBox from 'components/Feed/PermissionsBox';

import { primaryColor, secondaryColor, textColor } from 'colors';

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
    const { userContacts, isLoading, updateQuery, loadMoreUserContacts, onRefresh, filterByContact } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <Header style={styles.mainHeader} iosBarStyle={this.iosBarStyle} noShadow={true} searchBar>
          <Icon name={this.backIconName} style={styles.backButton} onPress={this.goBack} />
          <SearchBar />
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
    isLoading: state.userContacts.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
    filterByContact: (name) => dispatch(filterByContact(name)),
    toggleBlock: (userContactId) => dispatch(toggleBlock(userContactId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContactsScreen);

UserContactsScreen.propTypes = {};

const styles = StyleSheet.create({
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
  backButton: { color: textColor, fontSize: Platform.OS === 'android' ? 24 : 33, alignSelf: 'center' },
});
