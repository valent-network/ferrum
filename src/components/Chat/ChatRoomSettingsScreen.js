import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Text, View, Container, ActionSheet, Spinner, Separator, Icon } from 'native-base';

import {
  activeColor,
  textColor,
  disabledColor,
  secondaryColor,
  spinnerColor,
  deletedColor,
  primaryColor,
} from 'colors';

import { FlatList, Image, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import { getAdFriendsToChat, addUserToChat, leaveChat } from 'actions/chat';

import { mergeArraysKeepNew } from 'utils';

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

  const { t } = useTranslation();
  const initializeChat = () => {
    if (chat.ad_id) {
      getAdFriendsToChat(chat.ad_id, chat.id);
    }
  };

  useEffect(initializeChat, [chat.id]);

  const [friendToInvite, setFriendToInvite] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const onShow = () => {
    // navigation.popToTop(); // TODO: Don't know why its here, maybe it was breaking something
    navigation.navigate('Ad', { id: chat.ad_id });
  };
  const onLeave = () => {
    ActionSheet.show(
      {
        options: [t('chat.actions.leave'), t('chat.actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: t('chat.settings.leaveChatTitle'),
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
  const imageSource = { uri: chat.photo, cache: 'force-cache' };
  let toDisplay = toDisplayFriends.length
    ? [
        { separator: t('chat.settings.members') },
        ...toDisplayMembers,
        { separator: t('chat.settings.mayKnow') },
        ...toDisplayFriends,
      ]
    : [{ separator: t('chat.settings.members') }, ...toDisplayMembers];

  const keyExtractor = (item) => (item.separator || item.user_id || item.id).toString();
  const renderItem = ({ item }) => {
    const friendPhoneNumber = friendsAndMembers.filter((f) => f.user_id === item.user_id)[0]?.phone_number;
    return item.separator ? (
      <Text style={styles.separatorText}>{item.separator}</Text>
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
    <Container style={{ backgroundColor: primaryColor }}>
      <Image source={imageSource} style={styles.adPhoto} />
      <View style={styles.infoContainer}>
        {chat.ad_id && (
          <Text style={{ color: textColor }} onPress={onShow}>
            {chat.title}
            {'\n'}
            {<Text style={{ color: activeColor }}>{t('chat.settings.more')}</Text>}
          </Text>
        )}

        {!chat.ad_id && <Text style={{ color: textColor }}>{chat.title}</Text>}
      </View>
      <Text style={styles.leaveChat} onPress={onLeave}>
        {t('chat.settings.leaveChat')}&nbsp;
        <Icon name="log-out-outline" style={styles.leaveIcon} />
      </Text>
      {isLoading ? (
        <Spinner color={spinnerColor} />
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
    headerTitleStyle: { color: textColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: textColor,
    headerShown: true,
    headerTransparent: true,
  };
};

const styles = StyleSheet.create({
  adPhoto: {
    width: '100%',
    height: 350,
    maxHeight: '30%',
    opacity: 0.75,
  },
  leaveChat: {
    color: deletedColor,
    fontSize: 14,
    marginBottom: 16,
    paddingRight: 16,
    textAlign: 'right',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  separator: {
    backgroundColor: secondaryColor,
    borderColor: disabledColor,
    height: 48,
  },
  separatorText: {
    fontSize: 18,
    color: textColor,
    marginLeft: 16,
    paddingVertical: 16,
    fontWeight: 'bold',
  },
  leaveIcon: {
    fontSize: 14,
    color: deletedColor,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomsSettingsScreen);
