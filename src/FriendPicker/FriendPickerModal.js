import React from 'react';
import { connect } from 'react-redux';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';

import UserContactsList from '../UserContacts/UserContactsList';
import UsersListItem from './UsersListItem';

import { loadMoreUserContacts, getAll } from '../UserContacts/userContactsActions';

import { mainColor, lightColor } from '../Colors';

function FriendPickerModal({ user, userContacts, isLoading, onRefresh, loadMoreUserContacts, onClose, onUserPress }) {
  const renderItem = ({ item, index }) => <UsersListItem contact={item} onUserPress={onUserPress} />;

  return (
    <Modal animationType="slide" transparent={true} visible={true} animationType="slide">
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
  );
}

const styles = StyleSheet.create({
  modalControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingHorizontal: 0,
    flexDirection: 'column',
    flex: 1,
  },
  closeIcon: {
    alignSelf: 'flex-start',
    color: lightColor,
    fontSize: 48,
    fontWeight: 'bold',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrp: {
    backgroundColor: mainColor,
    paddingVertical: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '75%',
  },
  emptyArea: {
    height: '100%',
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
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
