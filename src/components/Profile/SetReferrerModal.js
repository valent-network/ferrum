import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import { Modal, StyleSheet, TouchableOpacity, Keyboard, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Icon, Text, Button, ActionSheet } from 'native-base';
import { useTranslation } from 'react-i18next';

import UserAvatar from 'react-native-user-avatar';

import { getReferrer, setReferrer } from 'actions/profile';

import { simpleColor, primaryColor, activeColor, secondaryColor, superActiveColor } from 'colors';

import { onReferralInfoPress } from 'utils';

import REFER from 'assets/refer.png';

function SetReferrerModal({ onClose, selfRefcode }) {
  const [refcode, setRefcode] = useState('');
  const [user, setUser] = useState({});
  const charInputs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [char1, setChar1] = useState(null);
  const [char2, setChar2] = useState(null);
  const [char3, setChar3] = useState(null);
  const [char4, setChar4] = useState(null);
  const [char5, setChar5] = useState(null);
  const chars = [char1, char2, char3, char4, char5];
  const setChars = [setChar1, setChar2, setChar3, setChar4, setChar5];
  const { t } = useTranslation();

  useEffect(() => setRefcode(chars.join('')), chars);

  useEffect(() => {
    getClipboardString();
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (refcode.toString().length !== 5) {
      setUser({});
      return;
    }

    Keyboard.dismiss();

    getReferrer(refcode)
      .then((payload) => {
        setUser(payload.data);
      })
      .catch((error) => {
        setUser({ notFound: true });
      });
  }, [refcode]);

  setRef = useCallback(() => {
    setReferrer(refcode)
      .then((payload) => {
        onClose();
      })
      .catch((error) => {
        onClose();
      });
  });

  confirmInvitation = () =>
    ActionSheet.show(
      {
        title: `${t('profile.referrer.actions.titleConfirmP1')} ${user.name}. ${t(
          'profile.referrer.actions.titleNoChangeP2',
        )}`,
        options: [t('actions.accept'), t('actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => buttonIndex === 0 && setRef(),
    );

  handleChar = (position) => {
    return ({ nativeEvent }) => {
      switch (nativeEvent.key) {
        case 'Backspace':
          if (position != 0 && chars[position] === '') {
            charInputs[position - 1].current.focus();
            setChars[position - 1]('');
          }
          setChars[position]('');
          break;
        case 'Enter':
          break;
        default:
          const char = nativeEvent.key.toUpperCase().split('')[nativeEvent.key.length - 1];
          setChars[position](char);
          if (position != 4) {
            charInputs[position + 1].current.focus();
          }
      }
    };
  };

  onChangeText = (value) => {
    if (value.match(/^\w{5}$/)) {
      value
        .toUpperCase()
        .split('')
        .forEach((char, index) => setChars[index](char));
      charInputs.map((input) => input.current.blur());
    }
  };

  async function getClipboardString() {
    const clipboard = await Clipboard.getString();

    if (clipboard.match(/^\w{5}$/)) {
      clipboard
        .toUpperCase()
        .split('')
        .forEach((char, index) => setChars[index](char));
      charInputs[0].current.blur();
    } else {
      charInputs[0].current.focus();
    }
  }

  const inputParams = {
    autoCapitalize: 'characters',
    style: styles.singleInput,
    maxLength: 6,
    onChangeText: onChangeText,
    autoCompleteType: 'off',
    autoCorrect: false,
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true} animationType="slide">
      <View style={styles.modalWrapper} bounces={false} extraHeight={96}>
        <TouchableOpacity style={styles.emptyArea} onPress={onClose}></TouchableOpacity>
        <View style={styles.wrp}>
          <View style={styles.modalControlsContainer}>
            <Icon name="close-outline" onPress={onClose} style={styles.closeIcon} />
          </View>

          <View style={styles.contentContainer}>
            <KeyboardAwareScrollView bounces={false} keyboardShouldPersistTaps="always">
              <View style={styles.header}>
                <Image source={REFER} style={styles.picture} />
              </View>
              <View style={styles.refcodeInput}>
                <View style={styles.singleInputWrapper}>
                  <TextInput
                    {...inputParams}
                    value={char1}
                    ref={charInputs[0]}
                    onKeyPress={handleChar(0)}
                    placeholder="R"
                    placeholderTextColor={simpleColor}
                    returnKeyType={'done'}
                  />
                </View>
                <View style={styles.singleInputWrapper}>
                  <TextInput
                    {...inputParams}
                    value={char2}
                    ref={charInputs[1]}
                    onKeyPress={handleChar(1)}
                    placeholder="E"
                    placeholderTextColor={simpleColor}
                    returnKeyType={'done'}
                  />
                </View>
                <View style={styles.singleInputWrapper}>
                  <TextInput
                    {...inputParams}
                    value={char3}
                    ref={charInputs[2]}
                    onKeyPress={handleChar(2)}
                    placeholder="C"
                    placeholderTextColor={simpleColor}
                    returnKeyType={'done'}
                  />
                </View>
                <View style={styles.singleInputWrapper}>
                  <TextInput
                    {...inputParams}
                    value={char4}
                    ref={charInputs[3]}
                    onKeyPress={handleChar(3)}
                    placeholder="A"
                    placeholderTextColor={simpleColor}
                    returnKeyType={'done'}
                  />
                </View>
                <View style={styles.singleInputWrapper}>
                  <TextInput
                    {...inputParams}
                    value={char5}
                    ref={charInputs[4]}
                    onKeyPress={handleChar(4)}
                    placeholder="R"
                    placeholderTextColor={simpleColor}
                    returnKeyType={'done'}
                  />
                </View>
              </View>

              {!user.refcode && <Text style={styles.noteText}>{t('profile.referrer.callToAction')}</Text>}

              {user.refcode && selfRefcode !== refcode && (
                <View>
                  <View style={styles.userAvatarContainer}>
                    <UserAvatar size={48} name={user.name || ''} src={user.avatar} bgColor={activeColor} />
                  </View>
                  <Text style={styles.noteText}>
                    {user.name} {t('profile.referrer.friendInvitesYou')}
                  </Text>
                  <Button style={styles.confirmButton} onPress={confirmInvitation} block>
                    <Text style={styles.noteText}>{t('profile.referrer.buttons.accepting')}</Text>
                  </Button>
                </View>
              )}

              {user.notFound && selfRefcode !== refcode && (
                <View style={styles.notFoundContainer}>
                  <Icon name="ios-sad" style={styles.notFound} />
                  <Text style={styles.noteText}>{t('profile.referrer.errors.userNotFound')}</Text>
                </View>
              )}

              {selfRefcode === refcode && (
                <View style={styles.notFoundContainer}>
                  <Icon name="ios-sad" style={styles.notFound} />
                  <Text style={styles.noteText}>{t('profile.referrer.errors.selfInvitation')}</Text>
                </View>
              )}
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalControlsContainer: {
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  closeIcon: {
    alignSelf: 'flex-end',
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
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '95%',
  },
  emptyArea: {
    height: '100%',
  },
  noteText: {
    fontSize: 16,
    marginBottom: 8,
    color: simpleColor,
  },
  confirmButton: {
    backgroundColor: activeColor,
    marginTop: 32,
  },
  notFound: {
    fontSize: 100,
    marginVertical: 16,
    color: simpleColor,
  },
  notFoundContainer: {
    alignItems: 'center',
  },
  singleInputWrapper: {
    padding: 16,
    width: '20%',
  },
  singleInput: {
    fontSize: 32,
    textAlign: 'center',
    borderBottomColor: simpleColor,
    borderBottomWidth: 1,
    color: superActiveColor,
  },
  refcodeInput: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 32,
  },
  header: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  userAvatarContainer: {
    width: 48,
    alignSelf: 'center',
  },
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
});

function mapStateToProps(state) {
  return {
    selfRefcode: state.user.refcode,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SetReferrerModal);
