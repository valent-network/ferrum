import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Text, View, Container, ActionSheet, Spinner, Separator, Icon } from 'native-base';

import { activeColor, mainColor, lightColor, darkColor, disabledColor, menuItemColor, borderColor } from '../Colors';

import { FlatList, Image, StyleSheet } from 'react-native';

import { getAdFriendsToChat, addUserToChat, leaveChat } from './chatActions';

import { mergeArraysKeepNew } from '../Utils';

import InvitationModal from './InvitationModal';
import AdFriend from './AdFriend';

function ChatRoomsSettingsScreen({
  chat,
  isLoading,
  friends,
  navigation,
  addUserToChat,
  leaveChat,
  getAdFriendsToChat,
}) {
  if (!chat?.id) {
    return null;
  }

  const initializeChat = () => {
    getAdFriendsToChat(chat.ad_id, chat.id);
  };

  useEffect(initializeChat, [chat.id]);

  const [friendToInvite, setFriendToInvite] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const onShow = () => {
    navigation.popToTop();
    navigation.navigate('VisitedAdScreen', { id: chat.ad_id });
  };
  const onLeave = () => {
    ActionSheet.show(
      {
        options: ['Покинуть чат', 'Отменить'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: `Покинув чат вы потеряете доступ ко всем его сообщениям, пока вас не пригласят обратно оставшиеся участники`,
      },
      (buttonIndex) => buttonIndex === 0 && leaveChat(chat.id),
    );
  };

  const openInviteFriendModal = (friend) => {
    setFriendToInvite(friend);
    setModalVisible(true);
  };

  const friendsAndMembers = mergeArraysKeepNew([...friends, ...chat.chat_room_users], (it) => it.user_id);
  const membersIds = chat.chat_room_users.map((cru) => cru.user_id);
  const toDisplayMembers = friendsAndMembers.filter((f) => f.user_id && membersIds.includes(f.user_id));
  const toDisplayFriends = friendsAndMembers.filter((f) => !membersIds.includes(f.user_id));
  let toDisplay = toDisplayFriends.length
    ? [{ separator: 'Участники' }, ...toDisplayMembers, { separator: 'Могут знать продавца' }, ...toDisplayFriends]
    : [{ separator: 'Участники' }, ...toDisplayMembers];

  const keyExtractor = (item) => (item.separator || item.user_id || item.id).toString();
  const renderItem = ({ item }) => {
    const friendPhoneNumber = friendsAndMembers.filter((f) => f.user_id === item.user_id)[0]?.phone_number;
    return item.separator ? (
      <Separator bordered style={styles.separator}>
        <Text style={styles.separatorText}>{item.separator}</Text>
      </Separator>
    ) : (
      <AdFriend
        friend={item}
        chat={chat}
        openInviteFriendModal={openInviteFriendModal}
        friendPhoneNumber={friendPhoneNumber}
      />
    );
  };
  const addUser = (userId, name) => addUserToChat(chat.id, userId, name);

  return (
    <Container>
      <Image source={{ uri: chat.photo }} style={styles.adPhoto} />
      <View style={styles.infoContainer}>
        <Text onPress={onShow}>
          {chat.title}
          {'\n'}
          <Text style={styles.activeColor}>Подробнее</Text>
        </Text>

        <Text style={styles.activeColor} onPress={onLeave}>
          Покинуть чать&nbsp;
          <Icon name="log-out-outline" style={styles.leaveIcon} />
        </Text>
      </View>
      {isLoading ? (
        <Spinner color={activeColor} />
      ) : (
        <FlatList data={toDisplay} refreshing={isLoading} keyExtractor={keyExtractor} renderItem={renderItem} />
      )}
      {modalVisible && <InvitationModal friend={friendToInvite} onClose={closeModal} onSubmit={addUser} />}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.currentChat.isLoadingSettings,
    friends: state.currentChat.friends,
    chat: state.currentChat.chatMetaData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAdFriendsToChat: (adId, chatRoomId) => dispatch(getAdFriendsToChat(adId, chatRoomId)),
    addUserToChat: (chatRoomId, userId, name) => dispatch(addUserToChat(chatRoomId, userId, name)),
    leaveChat: (chatRoomId) => dispatch(leaveChat(chatRoomId)),
  };
}

ChatRoomsSettingsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: '',
    headerTitleStyle: { color: lightColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: lightColor,
    headerShown: true,
    headerTransparent: true,
  };
};

const styles = StyleSheet.create({
  adPhoto: {
    width: '100%',
    height: 350,
    opacity: 0.75,
  },
  activeColor: {
    color: activeColor,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  separator: {
    backgroundColor: menuItemColor,
    borderColor: activeColor,
    height: 48,
  },
  separatorText: {
    fontSize: 16,
    color: disabledColor,
  },
  leaveIcon: {
    fontSize: 14,
    color: activeColor,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomsSettingsScreen);
