import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, AppState, SafeAreaView } from 'react-native';
import { GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import { Container, Content, Spinner, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import uk from 'dayjs/locale/uk';
import en from 'dayjs/locale/en-gb';

import { SET_CURRENT_CHAT, RESET_CURRENT_CHAT } from 'actions/types';
import { postMessage, getMessages, deleteMessage, onMessageLongPress } from 'actions/chat';
import { textColor, primaryColor, secondaryColor, spinnerColor } from 'colors';
import { localizedSystemMessage } from 'utils';
import { serverChannel } from 'services/ServerChannel';

import { commonGiftedChatOptions } from './commonGiftedChatOptions';

import CurrentChatHeader from './CurrentChatHeader';
import CurrentChatActions from './CurrentChatActions';

function ChatRoomScreen({
  userId,
  messages,
  chat,
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
    user: { _id: userId, name: userName },
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
    serverChannel.connectToChatRoomChannel(chatRoomId, 'user');
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
    if (typeof chatRoomId === 'undefined') return;
    const focusListener = navigation.addListener('willFocus', onConnect);
    const blurListener = navigation.addListener('willBlur', onDisconnect);
    AppState.addEventListener('change', appStateHandle);

    onConnect();

    return () => {
      focusListener.remove();
      blurListener.remove();
      onDisconnect();
      AppState.removeEventListener('change', appStateHandle);
    };
  }, [chatRoomId]);

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
    shouldLoadEarlier: !state.currentChat.lastLoaded,
    chat: state.currentChat.chatMetaData,
    messages: state.currentChat.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSend: (message, chatRoomId) => dispatch(postMessage(message, chatRoomId)),
    onDelete: (message) => dispatch(deleteMessage(message)),
    getMessages: (chatRoomId, offset) => dispatch(getMessages(chatRoomId, offset)),
    setCurrentChat: (chatRoomId) => dispatch({ type: SET_CURRENT_CHAT, chatRoomId: chatRoomId }),
    resetCurrentChat: () => dispatch({ type: RESET_CURRENT_CHAT }),
  };
}

ChatRoomScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTitle: () => <CurrentChatHeader />,
    headerTitleStyle: { color: textColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: textColor,
    headerRight: () => <CurrentChatActions />,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: secondaryColor,
  },
  spinnerContainer: {
    backgroundColor: primaryColor,
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
