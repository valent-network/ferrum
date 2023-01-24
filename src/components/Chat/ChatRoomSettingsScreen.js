import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Text, View, Container, ActionSheet, Spinner, Separator, Icon } from 'native-base';

import { activeColor, lightColor, disabledColor, secondaryColor, spinnerColor, notesColor } from 'colors';

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
    navigation.popToTop();
    navigation.navigate('VisitedAdScreen', { id: chat.ad_id });
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
  const imageSource = { uri: chat.photo };
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
      <Image source={imageSource} style={styles.adPhoto} />
      <View style={styles.infoContainer}>
        {chat.ad_id && (
          <Text onPress={onShow}>
            {chat.title}
            {'\n'}
            {<Text style={styles.activeColor}>{t('chat.settings.more')}</Text>}
          </Text>
        )}

        {!chat.ad_id && <Text>{chat.title}</Text>}

        <Text style={styles.activeColor} onPress={onLeave}>
          {t('chat.settings.leaveChat')}&nbsp;
          <Icon name="log-out-outline" style={styles.leaveIcon} />
        </Text>
      </View>
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
    backgroundColor: secondaryColor,
    borderColor: notesColor,
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
