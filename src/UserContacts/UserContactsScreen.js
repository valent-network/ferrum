import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Item, Icon, Input, Text, Left, Right } from 'native-base';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';

import NavigationService from '../services/NavigationService';

import UserContactsList from './UserContactsList';
import UserContactsListItem from './UserContactsListItem';

import { loadMoreUserContacts, getAll, updateQuery, toggleBlock } from './userContactsActions';

import { filterByContact } from '../Feed/feedActions';
import PermissionsBox from '../Feed/PermissionsBox';

import { primaryColor, secondaryColor, lightColor, disabledColor } from '../Colors';

class UserContactsScreen extends React.PureComponent {
  typingTimer = null;
  static navigationOptions = ({ navigation }) => {
    return { header: () => null, headerShown: false };
  };

  renderItem = ({ item, index }) => (
    <UserContactsListItem
      contact={item}
      filterByContact={this.props.filterByContact}
      toggleBlock={this.props.toggleBlock}
    />
  );

  resetQuery = () => this.props.updateQuery('');

  render() {
    const {
      userContacts,
      isLoading,
      query,
      updateQuery,
      loadMoreUserContacts,
      onRefresh,
      filterByContact,
    } = this.props;
    const onUpdateQuery = (query) => {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => updateQuery(query), 200);
    };

    return (
      <Container>
        <Header style={styles.mainHeader} iosBarStyle="light-content" noShadow={true} searchBar>
          <TouchableOpacity activeOpacity={1} onPress={() => NavigationService.navigate('ProfileScreen')}>
            <Left style={styles.topIconContainer}>
              <Icon name="chevron-back-outline" />
            </Left>
          </TouchableOpacity>
          <Item style={styles.searchBar}>
            <Icon name="ios-search" style={styles.searchIcon} />
            <Input
              placeholder="Поиск"
              placeholderTextColor={disabledColor}
              style={styles.inputTextColor}
              onChangeText={onUpdateQuery}
              defaultValue={query}
              returnKeyType={'done'}
            />
            {query.length > 0 && <Icon name="close-circle" style={styles.inputTextColor} onPress={this.resetQuery} />}
          </Item>
          <Right style={styles.topIconContainer}></Right>
        </Header>
        <PermissionsBox />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserContactsScreen);

UserContactsScreen.propTypes = {};

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: secondaryColor,
    flexWrap: 'nowrap',
    borderBottomWidth: 0,
    paddingBottom: 8,
  },
  searchBar: {
    borderRadius: 16,
    backgroundColor: primaryColor,
    marginTop: Platform.OS === 'android' ? 32 : 0,
    alignSelf: Platform.OS === 'android' ? 'flex-end' : 'center',
  },
  searchIcon: {
    color: disabledColor,
  },
  inputTextColor: {
    color: lightColor,
  },
  topIconContainer: {
    height: '100%',
    minWidth: 57,
    maxWidth: 57,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 57,
    maxHeight: 57,
  },
});
