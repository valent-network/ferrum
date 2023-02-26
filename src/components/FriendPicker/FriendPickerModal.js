import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';

import UserContactsList from 'components/UserContacts/UserContactsList';
import InvitationModal from 'components/Chat/InvitationModal';
import UsersListItem from './UsersListItem';

import { loadMoreUserContacts, getAll } from 'actions/userContacts';

import { textColor, secondaryColor } from 'colors';

function FriendPickerModal({
  userContacts,
  isLoading,
  onRefresh,
  loadMoreUserContacts,
  visible,
  adId,
  onSubmit,
  onClose,
}) {
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [friend, setFriend] = useState({});
  const onInvitationModalClose = useCallback(() => setInvitationVisible(false), []);
  const onUserPress = useCallback(
    (f) => {
      onClose();
      setFriend(f);
      setInvitationVisible(true);
    },
    [onClose],
  );
  const renderItem = useCallback(
    ({ item, index }) => <UsersListItem contact={item} onUserPress={onUserPress} />,
    [onUserPress],
  );

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={visible} animationType="slide">
        <View style={styles.modalWrapper} bounces={false} extraHeight={96}>
          <TouchableOpacity style={styles.emptyArea} onPress={onClose}></TouchableOpacity>
          <View style={styles.wrp}>
            <View style={styles.modalControlsContainer}>
              <Icon name="close-outline" onPress={onClose} style={styles.closeIcon} />
            </View>

            <View style={styles.contentContainer}>
              <UserContactsList
                userContacts={userContacts}
                isLoading={isLoading}
                loadMoreUserContacts={loadMoreUserContacts}
                onRefresh={onRefresh}
                renderItem={renderItem}
              />
            </View>
          </View>
        </View>
      </Modal>
      <InvitationModal visible={invitationVisible} friend={friend} adId={adId} onClose={onInvitationModalClose} />
    </>
  );
}

const styles = StyleSheet.create({
  modalControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: secondaryColor,
  },
  contentContainer: {
    paddingHorizontal: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: secondaryColor,
  },
  closeIcon: {
    color: textColor,
    fontSize: 48,
    fontWeight: 'bold',
    paddingRight: 12,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrp: {
    backgroundColor: secondaryColor,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '75%',
  },
  emptyArea: {
    height: '100%',
  },
});

function mapStateToProps(state) {
  return {
    userContacts: state.userContacts.list.filter((u) => !!u.user),
    isLoading: state.userContacts.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendPickerModal);
