import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, AppState, SafeAreaView } from 'react-native';
import { GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import { Container, Content, Spinner, Title } from 'native-base';
import { useTranslation } from 'react-i18next';

import uk from 'dayjs/locale/uk';
import en from 'dayjs/locale/en-gb';

import { SET_CURRENT_ADMIN_CHAT, RESET_CURRENT_ADMIN_CHAT } from 'actions/types';
import { postMessage, deleteMessage, onMessageLongPress } from 'actions/chat';
import { getAdminMessages } from 'actions/adminChat';
import { textColor, primaryColor, secondaryColor, spinnerColor } from 'colors';
import { localizedSystemMessage } from 'utils';
import { serverChannel } from 'services/ServerChannel';

import { commonGiftedChatOptions } from 'components/Chat/commonGiftedChatOptions';

function AdminChatRoomScreen({
  userId,
  messages,
  chat,
  currentChatId,
  shouldLoadEarlier,
  navigation,
  onSend,
  onDelete,
  getMessages,
  setCurrentChat,
  resetCurrentChat,
}) {
  const chatRoomId = navigation.state.params.chatRoomId;
  const { t, i18n } = useTranslation();
  const userName = chat.chat_room_users.filter((cru) => cru.user_id === userId)[0]?.name;
  const giftedChatOptions = {
    user: { _id: 'system', name: userName },
    messages: messages,
    locale: i18n.language === 'en' ? en : uk,
    onLoadEarlier: () => getMessages(chatRoomId, messages.length),
    loadEarlier: shouldLoadEarlier,
    onSend: (message) => onSend(message[0], chatRoomId),
    onLongPress: (context, message) => onMessageLongPress(userId, message, onDelete),
    renderSystemMessage: (props) => {
      props.currentMessage.text = localizedSystemMessage(props.currentMessage);

      return <SystemMessage {...props} />;
    },
  };

  const onConnect = useCallback(() => {
    if (typeof chatRoomId === 'undefined') return;

    setCurrentChat(chatRoomId);
    serverChannel.connectToChatRoomChannel(chatRoomId);
    getMessages(chatRoomId);
  }, [chatRoomId]);

  const onDisconnect = useCallback(() => {
    resetCurrentChat();
    serverChannel.disconnectChatRoomChannel();
  });

  const appStateHandle = () => {
    switch (AppState.currentState) {
      case 'inactive':
        onDisconnect();
        break;
      case 'active':
        onConnect();
        break;
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener('willFocus', onConnect);
    const blurListener = navigation.addListener('willBlur', onDisconnect);
    AppState.addEventListener('change', appStateHandle);

    if (!currentChatId) {
      onConnect();
    }

    return () => {
      focusListener.remove();
      blurListener.remove();
      onDisconnect();
      AppState.removeEventListener('change', appStateHandle);
    };
  }, []);

  if (!chat.id || !chatRoomId || typeof chatRoomId === 'undefined' || typeof chat.id === 'undefined') {
    return <SpinnerScreen />;
  }

  return (
    <Container style={styles.mainContainer}>
      <GiftedChat {...commonGiftedChatOptions} {...giftedChatOptions} />
    </Container>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    userId: state.user._id,
    shouldLoadEarlier: !state.currentAdminChat.lastLoaded,
    chat: state.currentAdminChat.chatMetaData,
    messages: state.currentAdminChat.messages.map((m) => {
      return { ...m, user: { ...m.user, _id: m.user._id || 'system' } }; // If GiftedChat doesn't have ID for user, it doesn't always render messages correctly
    }),
    currentChatId: state.currentAdminChat.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSend: (message, chatRoomId) => dispatch(postMessage(message, chatRoomId)),
    onDelete: (message) => dispatch(deleteMessage(message)),
    getMessages: (chatRoomId, offset) => dispatch(getAdminMessages(chatRoomId, offset)),
    setCurrentChat: (chatRoomId) => dispatch({ type: SET_CURRENT_ADMIN_CHAT, chatRoomId: chatRoomId }),
    resetCurrentChat: () => dispatch({ type: RESET_CURRENT_ADMIN_CHAT }),
  };
}

AdminChatRoomScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTitle: () => <Title style={styles.title}>{navigation.state.params.title}</Title>,
    headerTitleStyle: { color: textColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: textColor,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminChatRoomScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: secondaryColor,
  },
  spinnerContainer: {
    backgroundColor: primaryColor,
  },
  title: {
    color: textColor,
  },
});

const SpinnerScreen = () => {
  return (
    <Container style={styles.spinnerContainer}>
      <Content>
        <Spinner color={spinnerColor} />
      </Content>
    </Container>
  );
};
