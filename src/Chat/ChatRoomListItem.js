import React from 'react';
import { StyleSheet } from 'react-native';

import NavigationService from '../services/NavigationService';

import { Text, ListItem, Left, Body, Right, Thumbnail, Badge } from 'native-base';

import dayjs from 'dayjs';

import { activeColor } from '../Colors';

export default function ChatRoomListItem({ chat }) {
  const lastMessage = chat.messages[0];
  const onPress = () => NavigationService.navigate('ChatRoomScreen', { chatId: chat.id, title: chat.title });

  const lastMessageDateString = dayjs(dayjs().startOf('day')).isBefore(lastMessage.createdAt)
    ? dayjs(lastMessage.createdAt).locale('ru').format('HH:mm')
    : dayjs(lastMessage.createdAt).locale('ru').format('D MMM');
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
      style={styles.chatRow}>
      <Left>
        <Thumbnail source={{ uri: chat.photo }} style={styles.carPhoto} />
      </Left>
      <Body style={styles.previewBody}>
        <Text>{chat.title}</Text>
        <Text>{lastMessage?.user?._id && lastMessage.user.name}</Text>

        <Text note>{messagePreview}</Text>
      </Body>
      <Right style={styles.centered}>
        <Text note>{lastMessageDateString}</Text>
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
    borderColor: activeColor,
    borderWidth: 1,
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
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  centered: {
    alignItems: 'center',
  },
});
