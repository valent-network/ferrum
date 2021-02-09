import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';

import UserContactsList from '../UserContacts/UserContactsList';

import UsersListItem from './UsersListItem';

import { loadMoreUserContacts, getAll } from '../UserContacts/userContactsActions';

import { mainColor, lightColor } from '../Colors';

class InviteFriendsScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: mainColor,
      },
      headerTitle: 'Пригласить друзей',
      headerTitleStyle: { color: lightColor },
      headerBackTitle: () => null,
      headerTruncatedBackTitle: () => null,
      headerBackTitleVisible: false,
      headerTintColor: lightColor,
      headerRight: () => null,
    };
  };

  render() {
    const { isLoading, userContacts, loadMoreUserContacts, onRefresh } = this.props;
    const renderItem = ({ item, index }) => <UsersListItem contact={item} />;

    return (
      <UserContactsList
        userContacts={userContacts}
        isLoading={isLoading}
        loadMoreUserContacts={loadMoreUserContacts}
        onRefresh={onRefresh}
        renderItem={renderItem}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userContacts: state.userContacts.list.filter((u) => !u.user),
    isLoading: state.userContacts.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriendsScreen);
