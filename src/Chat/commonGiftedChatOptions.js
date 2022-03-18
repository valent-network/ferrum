import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { InputToolbar, Send, LoadEarlier } from 'react-native-gifted-chat';

import ru from 'dayjs/locale/ru';

import { activeColor, primaryColor, secondaryColor, UAYellow, lightColor } from '../Colors';

const renderLoadEarlier = (props) => <LoadEarlier label="Загрузить еще..." {...props} />;

const renderInputToolbar = (props) => (
  <InputToolbar {...props} textInputStyle={styles.textInput} containerStyle={styles.inputToolbarContainer} />
);

const renderSend = (props) => (
  <Send {...props} containerStyle={styles.sendContainer}>
    <Icon name="paper-plane" style={styles.sendButton} />
  </Send>
);

export const commonGiftedChatOptions = {
  ...(Platform.OS === 'ios' && { bottomOffset: 0 }),
  infiniteScroll: true,
  maxInputLength: 200,
  placeholder: 'Сообщение...',
  placeholderTextColor: secondaryColor,
  renderUsernameOnMessage: true,
  locale: ru,
  listViewProps: {
    style: {
      backgroundColor: primaryColor,
    },
    keyboardDismissMode: 'on-drag',
  },
  renderLoadEarlier,
  renderInputToolbar,
  renderSend,
};

const styles = StyleSheet.create({
  inputToolbarContainer: {
    backgroundColor: UAYellow,
  },
  textInput: {
    color: secondaryColor,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingRight: 12,
  },
  sendButton: {
    color: activeColor,
    fontWeight: 'bold',
  },
});
