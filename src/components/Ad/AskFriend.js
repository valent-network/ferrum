import React, { useState, useCallback } from 'react';
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
  const openFriendPickerModal = useCallback(() => setPickerVisible(true), []);
  const onFriendPickerModalClose = useCallback(() => setPickerVisible(false), []);
  const onInvitationModalClose = useCallback(() => setInvitationVisible(false), []);
  const [friend, setFriend] = useState({});
  const openInvitation = useCallback((friend) => {
    setInvitationVisible(true);
    setFriend(friend);
  }, []);
  const directFriend = friends.filter((friend) => friend.idx === 1)[0];

  return (
    <>
      {directFriend && (
        <View style={styles.flexRow}>
          <Text style={styles.postedBy}>{t('ad.postedBy')}</Text>
          <Text style={styles.postedByName}>{directFriend.name}</Text>
        </View>
      )}

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.mutualFriendsContainer}>
        <AnyFriendToInvite onPress={openFriendPickerModal} />
        <Chats chats={chats} />
        <Friends friends={friends} openInvitation={openInvitation} />
      </ScrollView>

      <FriendPickerModal visible={pickerVisible} adId={ad.id} onClose={onFriendPickerModalClose} />
      <InvitationModal visible={invitationVisible} friend={friend} adId={ad.id} onClose={onInvitationModalClose} />
    </>
  );
}

const Chats = ({ chats }) => chats.map((c) => <ChatToContinue chat={c} key={`chat-${c.id}`} />);

const Friends = ({ friends, openInvitation }) => (
  <>
    {friends.map((f) => (
      <FriendToInvite friend={f} key={`friend-${f.id}-hops-${f.idx}`} onPress={openInvitation} />
    ))}
  </>
);

AskFriend.propTypes = {
  ad: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  mutualFriendsContainer: {
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
  },
  flexRow: { flexDirection: 'row', flexWrap: 'wrap' },
  postedBy: { color: textColor, marginRight: 8 },
  postedByName: { fontWeight: 'bold', color: textColor },
});
