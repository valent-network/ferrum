import React from 'react';

import { Text, Icon, ListItem, Left, Body, Right, Button } from 'native-base';

import { StyleSheet } from 'react-native';

import UserAvatar from 'react-native-user-avatar';

import { activeColor, secondaryColor, disabledColor } from '../Colors';
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
      <UserAvatar
        size={48}
        name={friend.name || ''}
        src={friend.avatar}
        bgColor={friend.user_id ? activeColor : secondaryColor}
      />
      <Body>
        <Text style={friend.user_id && membersIds.includes(friend.user_id) ? { color: activeColor } : {}}>
          {friend.name}
        </Text>
        <Text style={styles.contactPhoneStyle}>{friendPhoneNumber}</Text>
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

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: secondaryColor,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: activeColor,
  },
  contactPhoneStyle: {
    fontSize: 12,
    color: disabledColor,
  },
});
