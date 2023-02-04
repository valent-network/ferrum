import React from 'react';

import UserAvatar from 'react-native-user-avatar';

import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'native-base';

import { useTranslation } from 'react-i18next';

import { secondaryColor, activeColor, primaryColor, textColor, activeTextColor } from 'colors';
import { invitationalSMS } from 'utils';

export default ({ friend, prepareInvitation }) => {
  const { t } = useTranslation();

  return (
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
        style={styles.button}
        onPress={
          friend.user_id
            ? () => prepareInvitation(friend)
            : () => invitationalSMS(friend.phone_number, t('ad.invitationText'))
        }
      >
        <Text style={{ color: activeTextColor }}>
          {friend.user_id ? t('ad.buttons.askFriend') : t('ad.buttons.inviteFriend')}
        </Text>
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
});
