import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

import { activeColor, primaryColor, textColor, spinnerColor, secondaryColor } from 'colors';
import { invitationalSMS } from 'utils';

import ListNotFound from 'components/ListNotFound';

class UserContactsList extends React.PureComponent {
  keyExtractor = (item) => item.id.toString();

  onEndReached = async () => this.props.loadMoreUserContacts();

  onRefresh = this.props.onRefresh;
  refreshControlLoading = (<RefreshControl refreshing={true} tintColor={spinnerColor} onRefresh={this.onRefresh} />);
  refreshControlStable = (<RefreshControl refreshing={false} tintColor={spinnerColor} onRefresh={this.onRefresh} />);

  render() {
    const { userContacts, isLoading, renderItem } = this.props;
    const refreshControl = isLoading ? this.refreshControlLoading : this.refreshControlStable;

    if (userContacts.length === 0) {
      return isLoading ? <Spinner color={spinnerColor} /> : <ListNotFound refreshControl={refreshControl} />;
    }

    return (
      <FlatList
        data={userContacts}
        refreshControl={refreshControl}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        renderItem={renderItem}
        style={styles.mainContainer}
      />
    );
  }
}

export default UserContactsList;

UserContactsList.propTypes = {
  userContacts: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: secondaryColor,
    borderWidth: 0,
  },
});
