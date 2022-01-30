import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';

import NavigationService from '../services/NavigationService';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Body, Right, Thumbnail, Badge, ActionSheet } from 'native-base';

import dayjs from 'dayjs';

import { activeColor, disabledColor, secondaryColor } from '../Colors';

import { leaveChat } from './chatActions';

import RECARIO_LOGO from '../assets/recario.png';

export default function ChatRoomListItem({ chat, currentUser }) {
  const dispatch = useDispatch();
  const lastMessage = chat.messages[0];
  const onPress = () => NavigationService.navigate('ChatRoomScreen', { chatRoomId: chat.id, title: chat.title });

  const lastMessageDateString = dayjs(dayjs().startOf('day')).isBefore(lastMessage.createdAt)
    ? dayjs(lastMessage.createdAt).locale('ru').format('HH:mm')
    : dayjs(lastMessage.createdAt).locale('ru').format('D MMM');
  let messagePreview = lastMessage ? lastMessage.text.replace(/\n/g, ' ') : '';
  messagePreview = messagePreview.length > 20 ? `${messagePreview.substring(0, 20)}...` : messagePreview;

  const onLongPress = () => {
    const msg = lastMessage.user?._id ? `${lastMessage.user.name}: ${messagePreview}` : messagePreview;
    const title = chat.system
      ? 'Системный чат\nВ него можно вернуться в любой момент'
      : `${chat.title}\n${lastMessageDateString} – ${msg}`;

    ActionSheet.show(
      {
        title: title,
        options: ['Покинуть чат', 'Отменить'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        buttonIndex === 0 && dispatch(leaveChat(chat.id));
      },
    );
  };

  return (
    <ListItem
      noBorder
      noIndent
      thumbnail
      activeOpacity={1}
      underlayColor="transparent"
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.chatRow}>
      <Left>
        {chat.system ? (
          <Thumbnail source={RECARIO_LOGO} style={styles.carPhoto} />
        ) : (
          <UserAvatar size={48} name={chat.title || ''} src={chat.photo} bgColor={activeColor} />
        )}
      </Left>
      <Body style={styles.previewBody}>
        <Text>{chat.system ? 'Рекарио' : chat.title}</Text>
        <Text>{lastMessage?.user?._id && (lastMessage.user._id === currentUser._id ? 'Вы' : lastMessage.user.name)}</Text>

        <Text style={styles.smallFont}>{messagePreview}</Text>
      </Body>
      <Right style={styles.centered}>
        <Text style={styles.smallFont}>{lastMessageDateString}</Text>
        {chat.new_messages_count > 0 && (
          <Badge style={styles.unreadBadge}>
            <Text>{chat.new_messages_count}</Text>
          </Badge>
        )}
      </Right>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  carPhoto: {
    width: 48,
    height: 48,
  },
  previewBody: {
    backgroundColor: 'transparent',
  },
  unreadBadge: {
    backgroundColor: activeColor,
    transform: [{ scale: 0.8 }],
    alignItems: 'center',
  },
  chatRow: {
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: secondaryColor,
  },
  centered: {
    alignItems: 'center',
  },
  smallFont: {
    color: disabledColor,
    fontSize: 14,
  },
});
