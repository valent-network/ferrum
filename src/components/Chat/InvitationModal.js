import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Icon, Item, Input, Button } from 'native-base';
import { useTranslation } from 'react-i18next';

import UserAvatar from 'react-native-user-avatar';

import { updateUserName } from 'actions/profile';

import { simpleColor, activeColor, secondaryColor, disabledColor, primaryColor, deletedColor } from 'colors';

function InvitationModal({ user, updateUserName, friend, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [name, setName] = useState(friend.name);
  const [userName, setUserName] = useState();
  const possibleIntroNames = [friend.user_name, friend.name].filter((n) => n && n.length);
  const onFinish = () => {
    onSubmit(friend.user_id, name);
    onClose();
  };
  const userNamePresent = !!user.name?.length;
  useEffect(() => setName(friend.name), [friend.name]);
  return (
    <Modal animationType="slide" transparent={true} visible={true} animationType="slide">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.modalWrapper}
        bounces={false}
        extraHeight={96}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity style={styles.emptyArea} onPress={onClose}></TouchableOpacity>
        <View style={styles.wrp}>
          <View style={styles.modalControlsContainer}>
            <Icon name="close-outline" onPress={onClose} style={styles.closeIcon} />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.userAvatarContainer}>
              <UserAvatar size={48} name={friend.name || ''} src={friend.avatar} bgColor={activeColor} />
            </View>
            <Text style={styles.friendInfo}>
              <Text style={{ color: simpleColor, fontSize: 22 }}>{friend.name}</Text>
              {'\n'}
              {friend.phone_number}
            </Text>
            {!userNamePresent && (
              <View style={styles.emptyUserNameContainer}>
                <Text style={{ color: simpleColor }}>{t('chat.nameYourselfText')}</Text>
                <Item>
                  <Input
                    style={styles.nameInput}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder={t('chat.placeholders.yourName')}
                    placeholderTextColor={disabledColor}
                    returnKeyType={'done'}
                  />
                </Item>
                <Button
                  disabled={!userName || !userName.length}
                  block
                  onPress={() => updateUserName(userName)}
                  style={!userName || !userName.length ? styles.disabledSubmitButton : styles.activeSubmitButton}
                >
                  <Text style={{ color: simpleColor }}>{t('chat.buttons.setMyName')}</Text>
                </Button>
              </View>
            )}
            <Text style={styles.introHeader}>{t('chat.introHeader')}</Text>

            {possibleIntroNames.map((n) => (
              <TouchableOpacity key={n} onPress={() => setName(n)}>
                <View style={styles.introduceNameContainer}>
                  <Icon name={name === n ? 'ellipse' : 'ellipse-outline'} style={styles.introduceOption} />
                  <Text style={{ color: simpleColor }}>{n}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <Item>
              <Input
                style={styles.nameInput}
                defaultValue={name}
                name={name}
                onChangeText={setName}
                placeholder={t('chat.placeholders.introduceFriend')}
                returnKeyType={'done'}
              />
            </Item>

            <Button
              disabled={!userNamePresent || !name}
              block
              dark
              style={userNamePresent && name ? styles.activeSubmitButton : styles.disabledSubmitButton}
              onPress={onFinish}
            >
              <Text style={{ color: simpleColor }}>{t('chat.buttons.addFriend')}</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  closeIcon: {
    color: simpleColor,
    fontSize: 48,
    fontWeight: 'bold',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrp: {
    backgroundColor: secondaryColor,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  emptyArea: {
    height: '100%',
  },
  introduceOption: { fontSize: 18, marginRight: 8, color: simpleColor },
  activeSubmitButton: { backgroundColor: activeColor, marginVertical: 24, color: simpleColor },
  disabledSubmitButton: { backgroundColor: 'grey', marginVertical: 24 },
  friendInfo: { color: simpleColor, alignSelf: 'center', textAlign: 'center' },
  emptyUserNameContainer: {
    backgroundColor: deletedColor,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: primaryColor,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  introduceNameContainer: { flexDirection: 'row', paddingVertical: 8 },
  introHeader: { marginVertical: 16, color: simpleColor },
  nameInput: {
    color: simpleColor,
  },
  userAvatarContainer: {
    width: 48,
    alignSelf: 'center',
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserName: (name) => dispatch(updateUserName(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModal);
