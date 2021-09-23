import React from 'react';

import { StyleSheet } from 'react-native';
import { Text, View, Button, Thumbnail } from 'native-base';
import { secondaryColor, activeColor } from '../Colors';
import NavigationService from '../services/NavigationService';

export default ({ chat }) => (
  <View style={styles.mutualFriendBox} key={chat.id}>
    <Thumbnail source={{ uri: (chat.chat_room_users[1] || chat.chat_room_users[0])?.avatar }} />
    <Text note style={styles.smallFont}>
      {chat.chat_room_users.map((cru) => cru.name).join(', ')}
    </Text>
    <Text note style={styles.smallFont}>
      {!chat.messages[0].system && `${chat.messages[0].user.name}: `}
      {chat.messages[0].text.replace(/\n/g, ' ').substring(0, 15)}
      {chat.messages[0].text.length > 15 && '...'}
      {'\n'}
    </Text>
    <Button
      small
      block
      dark
      style={styles.button}
      onPress={() => NavigationService.navigate('ChatRoomScreen', { chatRoomId: chat.id })}>
      <Text>Продолжить</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  noAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  mutualFriendBox: {
    padding: 6,
    borderWidth: 1,
    borderColor: activeColor,
    backgroundColor: secondaryColor,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: activeColor,
    marginTop: 16,
    alignSelf: 'center',
  },
  smallFont: {
    fontSize: 10,
  },
});
