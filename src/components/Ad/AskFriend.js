import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { activeColor, textColor } from 'colors';

import InvitationModal from 'components/Chat/InvitationModal';
import FriendPickerModal from 'components/FriendPicker/FriendPickerModal';

import FriendToInvite from './FriendToInvite';
import ChatToContinue from './ChatToContinue';
import AnyFriendToInvite from './AnyFriendToInvite';

export default function AskFriend({ ad, friends, chats }) {
  const { t } = useTranslation();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [friend, setFriend] = useState({});
  const openInvitation = (friend) => {
    setInvitationVisible(true);
    setFriend(friend);
  };
  const directFriend = friends.filter((friend) => friend.idx === 1)[0];

  return (
    <>
      {directFriend && (
        <Text style={{ color: textColor }}>
          {t('ad.postedBy')} <Text style={{ fontWeight: 'bold', color: textColor }}>{directFriend.name}</Text>
        </Text>
      )}

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.mutualFriendsContainer}>
        <AnyFriendToInvite onPress={() => setPickerVisible(true)} />
        {chats.map((c) => (
          <ChatToContinue chat={c} key={`chat-${c.id}`} />
        ))}
        {friends.map((f) => (
          <FriendToInvite friend={f} key={`friend-${f.id}-hops-${f.idx}`} onPress={openInvitation} />
        ))}
      </ScrollView>

      <FriendPickerModal visible={pickerVisible} adId={ad.id} onClose={() => setPickerVisible(false)} />
      <InvitationModal
        visible={invitationVisible}
        friend={friend}
        adId={ad.id}
        onClose={() => setInvitationVisible(false)}
      />
    </>
  );
}

AskFriend.propTypes = {
  ad: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  mutualFriendsContainer: {
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
  },
});
