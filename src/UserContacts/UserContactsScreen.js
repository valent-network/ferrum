import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Item, Icon, Input, Text, Fab } from 'native-base';
import { StyleSheet, Platform } from 'react-native';

import UserContactsList from './UserContactsList';
import UserContactsListItem from './UserContactsListItem';

import { loadMoreUserContacts, getAll, updateQuery } from './userContactsActions';

import { filterByContact } from '../Feed/feedActions';
import PermissionsBox from '../Feed/PermissionsBox';

import { appearanceBgColor, menuItemColor, lightColor, disabledColor } from '../Colors';

class UserContactsScreen extends React.PureComponent {
  typingTimer = null;
  static navigationOptions = ({ navigation }) => {
    return { header: () => null };
  };

  renderItem = ({ item, index }) => (
    <UserContactsListItem contact={item} filterByContact={this.props.filterByContact} />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContactsScreen);

UserContactsScreen.propTypes = {};

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: menuItemColor,
    borderBottomWidth: 0,
    paddingBottom: 16,
    paddingLeft: 12,
  },
  searchBar: {
    borderRadius: 16,
    backgroundColor: appearanceBgColor,
    marginTop: Platform.OS === 'android' ? 32 : 0,
  },
  searchIcon: {
    color: disabledColor,
  },
  inputTextColor: {
    color: lightColor,
  },
});
