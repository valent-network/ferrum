import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';

import NavigationService from '../services/NavigationService';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Body, Right, Thumbnail, Badge, ActionSheet } from 'native-base';

import dayjs from 'dayjs';

import { useTranslation } from 'react-i18next';

import { activeColor, disabledColor, secondaryColor, superActiveColor } from '../Colors';

import { leaveChat } from './chatActions';

import RECARIO_LOGO from '../assets/recario.png';

export default function ChatRoomListItem({ chat, currentUser }) {
  const { t } = useTranslation();
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
      ? t('chat.actions.systemChatHeader')
      : `${chat.title}\n${lastMessageDateString} – ${msg}`;

    ActionSheet.show(
      {
        title: title,
        options: [t('chat.actions.leave'), t('chat.actions.cancel')],
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
        <Text style={styles.title}>{chat.system ? t('chat.systemChatTitle') : chat.title}</Text>
        <Text>{lastMessage?.user?._id && (lastMessage.user._id === currentUser._id ? t('chat.you') : lastMessage.user.name)}</Text>

        <Text style={styles.smallFont}>{messagePreview}</Text>
      </Body>
      <Right style={styles.notes}>
        <Text style={[styles.smallFont, styles.centered]}>{lastMessageDateString}</Text>
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
    borderTopColor: activeColor,
    borderLeftColor: activeColor,
    borderRightColor: superActiveColor,
    borderBottomColor: superActiveColor,
    borderWidth: 1
  },
  previewBody: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  unreadBadge: {
    backgroundColor: activeColor,
    transform: [{ scale: 0.6 }],
    alignItems: 'center',
  },
  chatRow: {
    marginBottom: 8,
    borderBottomWidth: 0.6,
    borderBottomColor: secondaryColor,
  },
  centered: {
    alignSelf: 'center',
  },
  smallFont: {
    color: disabledColor,
    fontSize: 13,
  },
  title: {
    fontWeight: 'bold'
  },
  notes: {
    paddingTop: 6,
    paddingLeft: 2,
    paddingRight: 6,
    paddingBottom: 2,
    justifyContent: 'space-between'
  }
});
