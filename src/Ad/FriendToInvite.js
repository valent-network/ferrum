import React from 'react';

import { StyleSheet, Image } from 'react-native';
import { Text, View, Button, Thumbnail } from 'native-base';

import { mainColor, activeColor } from '../Colors';
import { invitationalSMS } from '../Utils';

const INVITATIONAL_TEXT_SMS = 'Привет, смотри, нашел твою машину здесь — https://recar.io/get';

export default ({ friend, prepareInvitation }) => (
  <View style={styles.mutualFriendBox} key={friend.id}>
    {friend.avatar ? (
      <Thumbnail source={{ uri: friend.avatar }} />
    ) : (
      <Image style={styles.noAvatar} source={require('../assets/default_avatar.png')} />
    )}
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
  noAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  mutualFriendBox: {
    padding: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: mainColor,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 0,
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
