import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import { Modal, StyleSheet, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Icon, Text, Thumbnail, Button, ActionSheet } from 'native-base';

import UserAvatar from 'react-native-user-avatar';

import { getReferrer, setReferrer } from './profileActions';

import { lightColor, primaryColor, activeColor } from '../Colors';

import { onReferralInfoPress } from '../Utils';

import RECARIO_LOGO from '../assets/recario.png';

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
        title: `Внимание, вы подтверждаете, что вас пригласил именно ${user.name}. Изменить свой выбор в будущем будет невозможно.`,
        options: ['Подтверждаю', 'Отменить'],
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
                <Thumbnail source={RECARIO_LOGO} />
              </View>
              <View style={styles.refcodeInput}>
                <View style={styles.singleInputWrapper}>
                  <TextInput
                    {...inputParams}
                    value={char1}
                    ref={charInputs[0]}
                    onKeyPress={handleChar(0)}
                    placeholder="R"
                    placeholderTextColor={lightColor}
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
                    placeholderTextColor={lightColor}
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
                    placeholderTextColor={lightColor}
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
                    placeholderTextColor={lightColor}
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
                    placeholderTextColor={lightColor}
                    returnKeyType={'done'}
                  />
                </View>
              </View>

              {!user.refcode && (
                <Text style={styles.noteText}>
                  Укажите пригласительный код человека, который рассказал вам о Рекарио. Это даст долгосрочные бонусы
                  вам обоим!
                </Text>
              )}

              {user.refcode && selfRefcode !== refcode && (
                <View>
                  <View style={styles.userAvatarContainer}>
                    <UserAvatar size={48} name={user.name || ''} src={user.avatar} bgColor={activeColor} />
                  </View>
                  <Text>{user.name} приглашает вас в Рекарио.</Text>
                  <Button style={styles.confirmButton} onPress={confirmInvitation} block>
                    <Text>Принимаю приглашение</Text>
                  </Button>
                </View>
              )}

              {user.notFound && selfRefcode !== refcode && (
                <View style={styles.notFoundContainer}>
                  <Icon name="ios-sad" style={styles.notFound} />
                  <Text>Пользователь не найден</Text>
                </View>
              )}

              {selfRefcode === refcode && (
                <View style={styles.notFoundContainer}>
                  <Icon name="ios-sad" style={styles.notFound} />
                  <Text>Вы не можете пригласить сами себя</Text>
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
    marginTop: 36,
  },
  contentContainer: {
    padding: 16,
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
    backgroundColor: primaryColor,
    paddingVertical: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 48,
    height: '100%',
  },
  emptyArea: {
    height: '100%',
  },
  noteText: {
    fontSize: 16,
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: activeColor,
    marginTop: 32,
  },
  notFound: {
    fontSize: 100,
    marginVertical: 16,
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
    borderBottomColor: lightColor,
    borderBottomWidth: 1,
    color: activeColor,
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
