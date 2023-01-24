import { createConsumer } from '@rails/actioncable';
import { EventRegister } from 'react-native-event-listeners';
import Navigation from './Navigation';
import { BASE_URL } from 'config';

// https://github.com/rails/rails/issues/35674
global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'wss://api.recar.io/cable';
} else {
  baseURL = `ws://${BASE_URL}/cable`;
}

let cachedToken;

class ServerChannel {
  constructor(callbacks) {
    this.callbacks = callbacks;
  }

  authenticate(accessToken) {
    if (typeof accessToken === 'undefined') {
      return undefined;
    }

    cachedToken = accessToken;
    this.cable = this.cable || createConsumer(`${baseURL}?access_token=${accessToken}`);
    return this.cable;
  }

  connectToUsersChannel(callbacks) {
    this.cable = this.cable || this.authenticate(cachedToken);

    if (!this.cable) {
      return undefined;
    }

    this.usersChannel =
      this.usersChannel ||
      this.cable.subscriptions.create('ApplicationCable::UserChannel', {
        received: (data) => this.processMessage(data, callbacks),
      });
  }

  connectToChatRoomChannel(chatRoomId) {
    this.cable = this.cable || this.authenticate(cachedToken);

    if (!this.cable) {
      return undefined;
    }

    this.chatRoomChannel =
      this.chatRoomChannel ||
      this.cable.subscriptions.create(
        { channel: 'ApplicationCable::ChatRoomChannel', chat_room_id: chatRoomId },
        {
          received: (data) => console.warn(data),
          subscribed: (data) => console.warn(data),
        },
      );
  }

  disconnectChatRoomChannel() {
    this.chatRoomChannel?.unsubscribe?.();
    this.chatRoomChannel = undefined;
  }

  disconnect() {
    this.usersChannel?.unsubscribe?.();
    this.chatRoomChannel?.unsubscribe?.();
    this.chatRoomChannel = undefined;
    this.usersChannel = undefined;
    this.cable = undefined;
  }

  processMessage = (payload, callbacks) => {
    const { onContactsProcessed, onNewMessage, onReadUpdate, onUnreadMessage, onDeleteMessage } = callbacks;

    switch (payload.type) {
      case 'contacts':
        onContactsProcessed();
        break;
      case 'chat':
        onNewMessage(payload.chat);
        break;
      case 'initiate_chat':
        onNewMessage(payload.chat, true);
        Navigation.navigate('ChatRoomScreen', { chatRoomId: payload.chat.id, title: payload.chat.title });
        break;
      case 'read_update':
        onReadUpdate(payload.chat);
        break;
      case 'unread_update':
        onUnreadMessage(payload.count);
        break;
      case 'delete_message':
        onDeleteMessage(payload.id, payload.chat_room_id, payload.updated_at);
        break;
      default:
        console.warn(payload);
    }
  };
}

export const serverChannel = new ServerChannel();
