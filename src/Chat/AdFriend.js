import React from 'react';

import { Text, Icon, ListItem, Left, Body, Right, Thumbnail, Button } from 'native-base';

import { StyleSheet } from 'react-native';

import { activeColor, disabledColor } from '../Colors';
import { invitationalSMS } from '../Utils';

export default function AdFriend({ friend, chat, openInviteFriendModal, friendPhoneNumber }) {
  const membersIds = chat.chat_room_users.map((cru) => cru.user_id);
  const addUserToChatRoom = (userId) => {
    if (!userId || membersIds.includes(userId)) {
      return;
    }

    openInviteFriendModal(friend);
  };

  return (
    <ListItem style={styles.mainContainer} noIndent thumbnail noBorder activeOpacity={1} underlayColor="transparent">
      {friend.user_id && (
        <Left>{friend.avatar ? <Thumbnail source={{ uri: friend.avatar }} /> : <DefaultAvatar />}</Left>
      )}
      <Body>
        <Text style={friend.user_id && membersIds.includes(friend.user_id) ? { color: activeColor } : {}}>
          {friend.name}
        </Text>
        <Text note>{friendPhoneNumber}</Text>
      </Body>
      {!membersIds.includes(friend.user_id) && (
        <Right>
          <Button
            small
            style={styles.addButton}
            onPress={
              friend.user_id
                ? () => addUserToChatRoom(friend.user_id)
                : () =>
                    invitationalSMS(
                      friend.phone_number,
                      'Привет, нашел твою машину в продаже и есть вопрос, скачай, пожалуйста – https://recar.io/get',
                    )
            }>
            <Text>{friend.user_id ? 'Добавить' : 'Пригласить'}</Text>
          </Button>
        </Right>
      )}
    </ListItem>
  );
}

const DefaultAvatar = () => <Thumbnail source={require('../assets/default_avatar.png')} />;

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: disabledColor,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: activeColor,
  },
});
