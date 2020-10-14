import { createConsumer } from "@rails/actioncable";
import { EventRegister } from "react-native-event-listeners";

// https://github.com/rails/rails/issues/35674
global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'wss://recar.io/cable';
} else {
  baseURL = 'ws://192.168.0.100:3000/cable';
}

class ServerChannel {
  constructor(callbacks) {
    this.callbacks = callbacks;
  }

  connect(accessToken) {
    const cable = createConsumer(`${baseURL}?access_token=${accessToken}`);
    this.channel = cable.subscriptions.create("ApplicationCable::UserChannel", {
      received: this.processMessage,
      subscribed: (data) => console.warn(data)
    });
  }

  disconnect() {
    this.channel?.unsubscribe?.();
  }

  processMessage = (payload) => {
    const { onContactsProcessed } = this.callbacks;

    switch(payload.type) {
      case 'contacts':
        onContactsProcessed();
        break;
      default:
        console.warn(payload)
    }
  };
}

export default ServerChannel;
