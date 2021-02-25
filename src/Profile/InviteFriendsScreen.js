import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, Icon } from 'native-base';
import { Share, StyleSheet } from 'react-native';

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

  shareAction = () => {
    Share.share({
      message: 'Скачать Рекарио: https://recar.io/get',
      title: 'Рекарио — покупка авто через друзей и знакомых',
    });
  };

  render() {
    const { isLoading, userContacts, loadMoreUserContacts, onRefresh } = this.props;
    const renderItem = ({ item, index }) => <UsersListItem contact={item} />;

    return (
      <React.Fragment>
        <Button bordered light style={styles.socialShare} onPress={this.shareAction}>
          <Text>Отправить ссылку</Text>
          <Icon name="share-outline" />
        </Button>
        <UserContactsList
          userContacts={userContacts}
          isLoading={isLoading}
          loadMoreUserContacts={loadMoreUserContacts}
          onRefresh={onRefresh}
          renderItem={renderItem}
        />
      </React.Fragment>
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
  socialShare: { margin: 16, alignSelf: 'center' },
});
