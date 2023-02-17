import React from 'react';
import { StyleSheet } from 'react-native';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Body, Right, Badge } from 'native-base';

import dayjs from 'dayjs';

import { useTranslation } from 'react-i18next';

import { activeColor, secondaryColor, textColor, activeTextColor } from 'colors';

import Navigation from 'services/Navigation';

export default function AdminChatRoomListItem({ chat, currentUser }) {
  const { t, i18n } = useTranslation();
  const lastMessage = chat.messages[0];
  const user = chat.chat_room_users[0];
  const onPress = () => Navigation.navigate('AdminChatRoomScreen', { chatRoomId: chat.id, title: user.name });

  let lastMessageDateString = dayjs(dayjs().startOf('day')).isBefore(lastMessage.createdAt)
    ? dayjs(lastMessage.createdAt).locale(i18n.language).format('HH:mm')
    : dayjs(lastMessage.createdAt).locale(i18n.language).format('D MMM');
  lastMessageDateString =
    dayjs().year() === parseInt(dayjs(lastMessage.createdAt).format('YYYY'))
      ? lastMessageDateString
      : `${lastMessageDateString} ${dayjs(lastMessage.createdAt).format('YYYY')}`;
  let messagePreview = lastMessage ? lastMessage.text.replace(/\n/g, ' ') : '';
  messagePreview = messagePreview.length > 20 ? `${messagePreview.substring(0, 20)}...` : messagePreview;

  return (
    <ListItem
      noBorder
      noIndent
      thumbnail
      activeOpacity={1}
      underlayColor="transparent"
      onPress={onPress}
      style={styles.chatRow}
    >
      <Left>
        <UserAvatar size={48} name={user.name || ''} src={user.avatar} bgColor={activeColor} />
      </Left>
      <Body style={styles.previewBody}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.textColor}>{lastMessage?.user?.name}</Text>
        <Text style={styles.smallFont}>{messagePreview}</Text>
      </Body>
      <Right style={styles.notes}>
        <Text style={[styles.smallFont, styles.centered]}>{lastMessageDateString}</Text>
        {chat.new_messages_count > 0 && (
          <Badge style={styles.unreadBadge}>
            <Text style={styles.activeTextColor}>{chat.new_messages_count}</Text>
          </Badge>
        )}
      </Right>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  previewBody: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  textColor: { color: textColor },
  activeTextColor: { color: activeTextColor },
  unreadBadge: {
    backgroundColor: activeColor,
    transform: [{ scale: 0.6 }],
    alignItems: 'center',
  },
  chatRow: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: secondaryColor,
  },
  centered: {
    alignSelf: 'center',
  },
  smallFont: {
    color: textColor,
    fontSize: 13,
  },
  title: {
    fontWeight: 'bold',
    color: textColor,
  },
  notes: {
    paddingTop: 6,
    paddingLeft: 2,
    paddingRight: 6,
    paddingBottom: 2,
    justifyContent: 'space-between',
  },
});
