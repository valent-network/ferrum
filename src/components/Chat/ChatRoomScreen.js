import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import { Container, Content, Spinner, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import uk from 'dayjs/locale/uk';
import en from 'dayjs/locale/en-gb';

import { SET_CURRENT_CHAT, RESET_CURRENT_CHAT } from 'actions/types';
import { postMessage, getMessages, deleteMessage, onMessageLongPress } from 'actions/chat';
import { lightColor, primaryColor, secondaryColor, spinnerColor } from 'colors';
import { localizedSystemMessage } from 'utils';
import { serverChannel } from 'services/ServerChannel';

import { commonGiftedChatOptions } from './commonGiftedChatOptions';

import CurrentChatHeader from './CurrentChatHeader';
import CurrentChatActions from './CurrentChatActions';

function ChatRoomScreen({
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

  if (!chatRoomId) {
    return <SpinnerScreen />;
  }

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

  const { t, i18n } = useTranslation();

  const onConnect = useCallback(() => {
    setCurrentChat(chatRoomId);
    serverChannel.connectToChatRoomChannel(chatRoomId);
    getMessages(chatRoomId);
  }, [chatRoomId]);

  const onDisconnect = useCallback(() => {
    resetCurrentChat();
    serverChannel.disconnectChatRoomChannel();
  }, []);

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

  if (!chat.id) {
    return <SpinnerScreen />;
  }

  const userName = chat.chat_room_users.filter((cru) => cru.user_id === userId)[0].name;

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
    currentChatId: state.currentChat.id,
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
      height: 104,
    },
    headerTitle: () => <CurrentChatHeader />,
    headerTitleStyle: { color: lightColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: lightColor,
    headerRight: () => <CurrentChatActions />,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
