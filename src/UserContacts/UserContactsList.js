import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, Linking,Platform } from 'react-native';
import { Spinner } from 'native-base';

import CSS from '../Styles';

import UserContactsListItem from './UserContactsListItem';
import ListNotFound from '../ListNotFound';

class UserContactsList extends React.PureComponent {

  _keyExtractor = item => item.id.toString();

  _onEndReached = async () => {
    this.props.loadMoreUserContactsDispatched();
  }

  invitationalSMS = phoneNumber => {
    const paramValue = Platform.OS === 'ios' ? '&' : '?';
    const message = 'Привет, посмотри – очень удобно купить и продать авто: https://recar.io';
    const url = `sms:${phoneNumber}${paramValue}body=${message}`;

    Linking.openURL(url);
  }

  // https://github.com/facebook/react-native/issues/26610
  flatListBugFix = { right: 1 }

  _renderItem = ({ item, index }) => <UserContactsListItem invitationalSMS={this.invitationalSMS} contact={item} filterByContactDispatched={this.props.filterByContactDispatched} />;

  render() {
    const { userContacts, isLoading, onRefresh, filterByContactDispatched } = this.props;
    const refreshControl = <RefreshControl refreshing={isLoading} tintColor={CSS.activeColor} onRefresh={onRefresh} />;

    if (userContacts.length === 0) {
      return isLoading ? <Spinner color={CSS.activeColor} /> : <ListNotFound refreshControl={refreshControl} />;
    }

    return (
      <FlatList data={userContacts}
                scrollIndicatorInsets={this.flatListBugFix}
                refreshControl={refreshControl}
                keyExtractor={this._keyExtractor}
                onEndReached={this._onEndReached}
                renderItem={this._renderItem} />
    );
  }
}

export default UserContactsList;

UserContactsList.propTypes = {
  userContacts: PropTypes.array.isRequired,
};
