import React from 'react';

import UserAvatar from 'react-native-user-avatar';

import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'native-base';

import { secondaryColor, activeColor, primaryColor } from '../Colors';
import { invitationalSMS } from '../Utils';

const INVITATIONAL_TEXT_SMS = 'Привет, смотри, нашел твою машину здесь — https://recar.io/get';

export default ({ friend, prepareInvitation }) => (
  <View style={styles.mutualFriendBox} key={friend.id}>
    <UserAvatar
      size={48}
      name={friend.name || ''}
      src={friend.avatar}
      bgColor={friend.user_id ? activeColor : primaryColor}
    />
    <Text note style={styles.smallFont}>
      {friend.name}
    </Text>
    <Text note style={styles.smallFont}>
      {friend.phone_number}
    </Text>
    <Button
      small
      block
      dark
      style={styles.button}
      onPress={
        friend.user_id
          ? () => prepareInvitation(friend)
          : () => invitationalSMS(friend.phone_number, INVITATIONAL_TEXT_SMS)
      }>
      <Text>{friend.user_id ? 'Спросить' : 'Пригласить'}</Text>
    </Button>
  </View>
);

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
    fontSize: 10,
  },
});
