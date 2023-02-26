import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View, Button } from 'native-base';
import { useTranslation } from 'react-i18next';

import { secondaryColor, activeColor, textColor, activeTextColor } from 'colors';

const LOGO = require('assets/logo.png');

export default ({ onPress }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.mutualFriendBox}>
      <Image style={styles.noAvatar} source={LOGO} />
      <Text note style={styles.smallFont}>
        {`\n${t('ad.discussWithFriend')}\n`}
      </Text>
      <Button style={styles.button} onPress={onPress}>
        <Text style={styles.activeTextColor}>{t('ad.buttons.selectFriend')}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  noAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    fontSize: 12,
    color: textColor,
  },
  activeTextColor: { color: activeTextColor },
});
