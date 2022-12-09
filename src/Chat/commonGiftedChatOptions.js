import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { InputToolbar, Send, LoadEarlier } from 'react-native-gifted-chat';

import i18n from '../../i18n';

import { activeColor, primaryColor, lightColor, secondaryColor, superActiveColor } from '../Colors';

const renderLoadEarlier = (props) => <LoadEarlier label={i18n.t('chat.placeholders.loadMore')} {...props} />;

const renderInputToolbar = (props) => (
  <InputToolbar {...props} textInputStyle={styles.textInput} containerStyle={styles.inputToolbarContainer} />
);

const renderSend = (props) => (
  <Send {...props} containerStyle={styles.sendContainer}>
    <Icon name="arrow-up-circle-outline" style={styles.sendButton} />
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
    borderTopWidth: 0.5,
    borderTopColor: primaryColor,
    backgroundColor: secondaryColor,
    paddingTop: 4

  },
  textInput: {
    color: lightColor,
    borderRadius: 10,
    backgroundColor: primaryColor,
    fontSize: 16,
    paddingLeft: 8,
    lineHeight: 18,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 4,

  },
  sendButton: {
    color: superActiveColor,
    fontWeight: 'bold',
    fontSize: 36
  },
});
