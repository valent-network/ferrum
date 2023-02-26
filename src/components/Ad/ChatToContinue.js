import React, { useCallback } from 'react';

import UserAvatar from 'react-native-user-avatar';

import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'native-base';
import { useTranslation } from 'react-i18next';

import { secondaryColor, activeColor, textColor, activeTextColor } from 'colors';
import Navigation from 'services/Navigation';

export default ({ chat }) => {
  const { t } = useTranslation();
  const firstUser = chat.chat_room_users[1] || chat.chat_room_users[0];
  const goToChat = useCallback(() => Navigation.navigate('ChatRoomScreen', { chatRoomId: chat.id }), [chat.id]);
  const lastMessage = chat.messages[0];
  let chatPreview = [];

  if (!lastMessage.system) chatPreview.push(`${lastMessage.user.name}: `);
  chatPreview.push(lastMessage.text.replace(/\n/g, ' ').substring(0, 15));
  if (lastMessage.text.length > 15) chatPreview.push('...');
  chatPreview.push('\n');

  return (
    <View style={styles.mutualFriendBox} key={chat.id}>
      <UserAvatar size={48} name={firstUser?.name || ''} src={firstUser?.avatar} bgColor={activeColor} />

      <Text note style={styles.smallFont}>
        {chat.chat_room_users.map((cru) => cru.name).join(', ')}
      </Text>
      <Text note style={styles.smallFont}>
        {chatPreview.join('')}
      </Text>
      <Button style={styles.button} onPress={goToChat}>
        <Text style={styles.activeTextColor}>{t('ad.buttons.continueChat')}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 12,
    color: textColor,
  },
  activeTextColor: { color: activeTextColor },
});
