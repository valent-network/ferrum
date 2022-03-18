import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, Icon } from 'native-base';
import { Share, StyleSheet } from 'react-native';

import UserContactsList from '../UserContacts/UserContactsList';

import UsersListItem from './UsersListItem';

import { loadMoreUserContacts, getAll } from '../UserContacts/userContactsActions';

import { primaryColor, lightColor, activeColor, secondaryColor, UABlue } from '../Colors';

class InviteFriendsScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    shareAction = () => {
      Share.share({
        message: 'Скачать Рекарио: https://recar.io/get',
        title: 'Рекарио — покупка авто через друзей и знакомых',
      });
    };

    return {
      headerStyle: {
        backgroundColor: UABlue,
        borderWidth: 0,
        borderBottomColor: primaryColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerTitle: 'Пригласить друзей',
      headerTitleStyle: { color: lightColor },
      headerBackTitle: () => null,
      headerTruncatedBackTitle: () => null,
      headerBackTitleVisible: false,
      headerTintColor: lightColor,
      headerRight: () => <Icon name="share-outline" style={styles.socialShare} onPress={shareAction} />,
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

const styles = StyleSheet.create({
  socialShare: {
    marginRight: 16,
    alignSelf: 'center',
    fontSize: 24,
    color: primaryColor,
  },
});
