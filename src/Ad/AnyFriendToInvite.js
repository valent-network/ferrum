import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View, Button } from 'native-base';

import { secondaryColor, activeColor } from '../Colors';

export default ({ openFriendPickerModal }) => (
  <View style={styles.mutualFriendBox}>
    <Image style={styles.noAvatar} source={require('../assets/recario.png')} />
    <Text note style={styles.smallFont}>
      {'\n'}Обсудить с другом{'\n'}
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
