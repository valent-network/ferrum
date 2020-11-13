import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import { activeColor } from '../Colors';
import { invitationalSMS } from '../Utils';

import UserContactsListItem from './UserContactsListItem';
import ListNotFound from '../ListNotFound';

class UserContactsList extends React.PureComponent {
  keyExtractor = (item) => item.id.toString();

  onEndReached = async () => this.props.loadMoreUserContacts();

  renderItem = ({ item, index }) => (
    <UserContactsListItem contact={item} filterByContact={this.props.filterByContact} />
  );

  onRefresh = this.props.onRefresh;
  refreshControlLoading = (<RefreshControl refreshing={true} tintColor={activeColor} onRefresh={this.onRefresh} />);
  refreshControlStable = (<RefreshControl refreshing={false} tintColor={activeColor} onRefresh={this.onRefresh} />);

  render() {
    const { userContacts, isLoading, onRefresh, filterByContact } = this.props;
    const refreshControl = isLoading ? this.refreshControlLoading : this.refreshControlStable;

    if (userContacts.length === 0) {
      return isLoading ? <Spinner color={activeColor} /> : <ListNotFound refreshControl={refreshControl} />;
    }

    return (
      <FlatList
        data={userContacts}
        refreshControl={refreshControl}
        eyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
      />
    );
  }
}

export default UserContactsList;

UserContactsList.propTypes = {
  userContacts: PropTypes.array.isRequired,
};
