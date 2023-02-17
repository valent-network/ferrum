import PushNotification from 'react-native-push-notification';
import Clipboard from '@react-native-clipboard/clipboard';
import { Platform } from 'react-native';
import { ActionSheet } from 'native-base';
import * as ActionTypes from 'actions/types';
import API from 'services/API';
import { localizedSystemMessage, notification as UINotification, LOGO_URL } from 'utils';
import Navigation from 'services/Navigation';
import { serverChannel } from 'services/ServerChannel';
import { displayError } from 'actions/errors';
import i18n from 'services/i18n';

export function getChatRooms(offset = 0) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.GET_CHAT_ROOMS_STARTED });
    API.getChatRooms(offset)
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_CHAT_ROOMS_SUCCESS, list: payload.data });
      })
      .catch((error) => {
        displayError(error);
        dispatch({ type: ActionTypes.GET_CHAT_ROOMS_FAILED });
      });
  };
}

export function postMessage(message, chatRoomId) {
  return function (dispatch) {
    message.pending = true;
    message.chat_room_id = chatRoomId;
    // chat.messages = [message, ...chat.messages];

    dispatch({ type: ActionTypes.POST_MESSAGE, chatRoomId: chatRoomId, message: message });
    serverChannel.chatRoomChannel.send({ message });
  };
}

export function getMessages(chatRoomId, offset = 0) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.SYNC_MESSAGES_STARTED, chatRoomId: chatRoomId });
    API.getMessages(chatRoomId, offset).then(({ data }) => {
      dispatch({ type: ActionTypes.SYNC_MESSAGES_SUCCESS, chat: data.chat, messages: data.messages });
    });
  };
}

export function initiateChatRoom(adId, userId, name) {
  return function (dispatch) {
    Navigation.navigate('ChatRoomScreen', { chat: {} });
    API.initiateChatRoom(adId, userId, name).then(({ data }) => {
      dispatch({ type: ActionTypes.GET_AD_FRIENDS_SUCCESS, adFriends: data });
      dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_FRIENDS_SUCCESS, adFriends: data });

      dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatRoomId: data.chat_room.id });
      serverChannel.connectToChatRoomChannel(data.chat_room.id, 'user');
      dispatch(getMessages(data.chat_room.id));
    });
  };
}

export function initiateSystemChatRoom() {
  return function (dispatch) {
    Navigation.navigate('ChatRoomScreen', { chat: {} });
    // dispatch({ type: ActionTypes.GET_AD_FRIENDS_SUCCESS, adFriends: [] });
    // dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_FRIENDS_SUCCESS, adFriends: [] });
    API.initiateSystemChatRoom().then(({ data }) => {
      dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatRoomId: data.chat_room_id });
      Navigation.navigate('ChatRoomScreen', { chat: {}, chatRoomId: data.chat_room_id });
      serverChannel.connectToChatRoomChannel(data.chat_room_id, 'user');
      dispatch(getMessages(data.chat_room_id));
    });
  };
}

export function getAdFriendsToChat(adId, chatRoomId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_CHAT_AD_FRIENDS_STARTED });

    return API.getAdFriends(adId)
      .then(({ data }) => {
        const chatMetaData = data.chats.filter((c) => c.id === chatRoomId)[0];
        dispatch({ type: ActionTypes.GET_CHAT_AD_FRIENDS_SUCCESS, friends: data.friends, chat: chatMetaData });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_CHAT_AD_FRIENDS_FAILED });
        displayError(error);
      });
  };
}

export function addUserToChat(chatRoomId, userId, name) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_CHAT_AD_FRIENDS_STARTED });

    return API.addUserToChat(chatRoomId, userId, name)
      .then(({ data }) => {
        dispatch({ type: ActionTypes.GET_CHAT_AD_FRIENDS_SUCCESS, friends: data.friends, chat: data.chat_room });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_CHAT_AD_FRIENDS_FAILED });
        displayError(error);
      });
  };
}

export function leaveChat(chatRoomId) {
  return (dispatch) => {
    return API.leaveChat(chatRoomId).then(() => {
      Navigation.popToTop();
      dispatch({ type: ActionTypes.LEAVE_CHAT_SUCCESS, chatRoomId: chatRoomId });
    });
  };
}

function goToChat(chat, dispatch) {
  Navigation.navigate('ChatRoomScreen', { chat: chat, chatRoomId: chat.id });

  dispatch({ type: ActionTypes.RESET_CURRENT_CHAT });
  dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatRoomId: chat.id });
  dispatch(getMessages(chat.id));

  serverChannel.disconnectChatRoomChannel();
  serverChannel.connectToChatRoomChannel(chat.id, 'user');
}

export function newMessage(chat, myMessage = false) {
  return (dispatch, getState) => {
    const currentChatId = getState().currentChat.id;
    const currentUserId = getState().user._id;
    const message = chat.messages[0];
    const messageBody = message.system ? localizedSystemMessage(message) : message.text;
    const messageUserId = message.user._id;

    // This is how we are currently going to determine if the message should
    // have sender name in notification. We can't omit sender name in all system
    // messages because some messages may come from support or news etc
    // In future if necessary this condition may be more complex
    const isServiceMessage = message.system && message.extra.type;

    const shouldShowUINoitifcation = !myMessage && messageUserId !== currentUserId;

    const chatPhoto = chat.system ? LOGO_URL : chat.photo;
    const chatTitle = chat.system ? message.user.name : chat.title;

    if (currentChatId === chat.id) {
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
            onPress: () => goToChat(chat, dispatch),
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

export function readUpdate(chat) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.MESSAGE_WAS_READ, chat: chat });
  };
}

export function deleteMessage(message) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.MESSAGE_IS_DELETING, message: message });
    serverChannel.chatRoomChannel.perform('destroy', { message: { id: message._id } });
  };
}

export function deleteMessageFinished(id, chat_room_id, updated_at) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.MESSAGE_WAS_DELETED, id: id, chat_room_id: chat_room_id, updated_at: updated_at });
  };
}

export function updateUnread(count, systemCount) {
  return (dispatch) => {
    PushNotification.setApplicationIconBadgeNumber(count);
    dispatch({ type: ActionTypes.UPDATE_UNREAD_MESSAGES_COUNT, count: count, systemCount: systemCount });
  };
}

export function onMessageLongPress(userId, message, onDelete) {
  const actions = [{ title: i18n.t('chat.actions.copyMessage'), callback: () => Clipboard.setString(message.text) }];
  let destructiveButtonIndex = null;
  if (userId === message.user._id) {
    actions.push({ title: i18n.t('chat.actions.deleteMessage'), callback: onDelete });
    destructiveButtonIndex = 1;
  }

  const actionSheetOptions = {
    options: [...actions.map((a) => a.title), i18n.t('chat.actions.cancel')],
    cancelButtonIndex: actions.length + 1,
    destructiveButtonIndex: destructiveButtonIndex,
  };

  return ActionSheet.show(actionSheetOptions, (buttonIndex) => actions[buttonIndex]?.callback(message));
}
