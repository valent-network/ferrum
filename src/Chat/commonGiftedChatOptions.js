import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { InputToolbar, Send, LoadEarlier } from 'react-native-gifted-chat';

import i18n from '../../i18n';

import { activeColor, primaryColor, lightColor, secondaryColor } from '../Colors';

const renderLoadEarlier = (props) => <LoadEarlier label={i18n.t('chat.placeholders.loadMore')} {...props} />;

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
    borderTopWidth: 0.5,
    borderTopColor: primaryColor,
  },
  textInput: {
    color: lightColor,
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
