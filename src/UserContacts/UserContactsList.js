import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import { activeColor, primaryColor, secondaryColor } from '../Colors';
import { invitationalSMS } from '../Utils';

import ListNotFound from '../ListNotFound';

class UserContactsList extends React.PureComponent {
  keyExtractor = (item) => item.id.toString();

  onEndReached = async () => this.props.loadMoreUserContacts();

  onRefresh = this.props.onRefresh;
  refreshControlLoading = (<RefreshControl refreshing={true} tintColor={secondaryColor} onRefresh={this.onRefresh} />);
  refreshControlStable = (<RefreshControl refreshing={false} tintColor={secondaryColor} onRefresh={this.onRefresh} />);

  render() {
    const { userContacts, isLoading, renderItem } = this.props;
    const refreshControl = isLoading ? this.refreshControlLoading : this.refreshControlStable;

    if (userContacts.length === 0) {
      return isLoading ? <Spinner color={activeColor} /> : <ListNotFound refreshControl={refreshControl} />;
    }

    return (
      <FlatList
        data={userContacts}
        refreshControl={refreshControl}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        renderItem={renderItem}
        style={{ backgroundColor: primaryColor, borderWidth: 0 }}
      />
    );
  }
}

export default UserContactsList;

UserContactsList.propTypes = {
  userContacts: PropTypes.array.isRequired,
};
