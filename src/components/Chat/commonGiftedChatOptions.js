import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { InputToolbar, Send, LoadEarlier } from 'react-native-gifted-chat';

import i18n from 'services/i18n';

import { activeColor, primaryColor, textColor, secondaryColor } from 'colors';

const renderLoadEarlier = (props) => <LoadEarlier label={i18n.t('chat.placeholders.loadMore')} {...props} />;

const renderInputToolbar = (props) => (
  <InputToolbar {...props} textInputStyle={styles.textInput} containerStyle={styles.inputToolbarContainer} />
);

const renderSend = (props) => (
  <Send {...props} containerStyle={styles.sendContainer}>
    <Icon name="arrow-up-circle-sharp" style={styles.sendButton} />
  </Send>
);

export const commonGiftedChatOptions = {
  ...(Platform.OS === 'ios' && { bottomOffset: 1 }),
  infiniteScroll: true,
  maxInputLength: 200,
  wrapInSafeArea: true,
  alwaysShowSend: true,
  placeholder: i18n.t('chat.placeholders.message'),
  renderUsernameOnMessage: true,
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
    backgroundColor: secondaryColor,
    borderTopColor: secondaryColor,
    backgroundColor: secondaryColor,
  },
  textInput: {
    color: textColor,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 4,
  },
  sendButton: {
    color: activeColor,
    fontWeight: 'bold',
    fontSize: 32,
    paddingRight: 4,
  },
});
