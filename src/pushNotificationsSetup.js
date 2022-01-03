import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { setPushToken } from './AsyncStorage';

export default class NotifService {
  constructor(onNotification) {

    PushNotification.createChannel({ channelId: 'messages', channelName: 'Messages Channel' });

    PushNotification.configure({
      onRegister: setPushToken,
      onNotification: onNotification,
      requestPermissions: Platform.OS === 'android',
      popInitialNotification: true,
    });
  }
}
