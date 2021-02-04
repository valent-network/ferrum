import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View, Button } from 'native-base';

import { mainColor, activeColor } from '../Colors';

export default ({ openFriendPickerModal }) => (
  <View style={styles.mutualFriendBox}>
    <Image style={styles.noAvatar} source={require('../assets/default_avatar.png')} />
    <Text note style={styles.smallFont}>
      Обсудить с другом
    </Text>
    <Button small block dark style={styles.button} onPress={openFriendPickerModal}>
      <Text>Выбрать</Text>
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
