import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import * as ActionTypes from 'actions/types';
import API from 'services/API';
import { localizedSystemMessage, notification as UINotification } from 'utils';
import { serverChannel } from 'services/ServerChannel';
import Navigation from 'services/Navigation';
import { displayError } from 'actions/errors';

export function getAdminChatRooms(offset = 0) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.GET_ADMIN_CHAT_ROOMS_STARTED });
    API.getAdminChatRooms(offset)
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_ADMIN_CHAT_ROOMS_SUCCESS, list: payload.data });
      })
      .catch((error) => {
        displayError(error);
        dispatch({ type: ActionTypes.GET_ADMIN_CHAT_ROOMS_FAILED });
      });
  };
}

export function getAdminMessages(chatRoomId, offset = 0) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.SYNC_MESSAGES_STARTED, chatRoomId: chatRoomId });
    API.getAdminMessages(chatRoomId, offset).then(({ data }) => {
      dispatch({ type: ActionTypes.SYNC_MESSAGES_SUCCESS, chat: data.chat, messages: data.messages });
    });
  };
}

function goToAdminChat(chat, dispatch) {
  Navigation.navigate('AdminChatRoomScreen', { chat: chat, chatRoomId: chat.id });

  dispatch({ type: ActionTypes.RESET_CURRENT_ADMIN_CHAT });
  dispatch({ type: ActionTypes.SET_CURRENT_ADMIN_CHAT, chatRoomId: chat.id });
  dispatch(getAdminMessages(chat.id));

  serverChannel.disconnectChatRoomChannel();
  serverChannel.connectToChatRoomChannel(chat.id);
}

export function newAdminMessage(chat, myMessage = false) {
  return (dispatch, getState) => {
    const state = getState();
    const firstUser = chat.chat_room_users[0];
    const currentChatId = state.currentChat.id;
    const currentAdminChatId = state.currentAdminChat.id;
    const currentUserId = state.user._id;
    const message = chat.messages[0];
    const messageBody = message.system ? localizedSystemMessage(message) : message.text;
    const messageUserId = message.user._id;

    const chatPhoto = chat.system ? firstUser?.avatar : chat.photo;
    const chatTitle = chat.system ? 'SYSTEM' : chat.title;

    // This is how we are currently going to determine if the message should
    // have sender name in notification. We can't omit sender name in all system
    // messages because some messages may come from support or news etc
    // In future if necessary this condition may be more complex
    const isServiceMessage = message.system && message.extra.type;

    const shouldShowUINoitifcation = !myMessage && messageUserId !== currentUserId;

    if (currentChatId === chat.id || currentAdminChatId === chat.id) {
      if (messageUserId !== currentUserId) {
        serverChannel.chatRoomChannel.perform('read');
      }
    } else {
      if (shouldShowUINoitifcation) {
        if (Platform.OS === 'ios') {
          UINotification.ref.show({
            message: {
              message: messageBody,
              photo: chatPhoto,
              name: isServiceMessage ? '' : message.user?.name,
              title: chatTitle,
            },
            onPress: () => goToAdminChat(chat, dispatch),
          });
        } else {
          PushNotification.localNotification({
            title: chatTitle,
            message: messageBody,
            largeIconUrl: chatPhoto,
            bigPictureUrl: chatPhoto,
            channelId: 'messages',
            userInfo: {
              chat_room_id: chat.id,
              notification_action: 'open_chat_room',
            },
          });
        }
      }
    }

    dispatch({ type: ActionTypes.POST_MESSAGE_SUCCESS, chat: chat });
  };
}
