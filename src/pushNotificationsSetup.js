import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import NavigationService from './services/NavigationService';
import API from './services/API';
import { setPushToken } from './AsyncStorage';

export default function () {
  PushNotification.createChannel({ channelId: 'messages', channelName: 'Messages Channel' });

  PushNotification.configure({
    onRegister: setPushToken,
    onNotification: onNotification,
    requestPermissions: Platform.OS === 'android',
  });
}

function onNotification(notification) {
  if (notification.foreground) {
    if (Platform.OS === 'ios') {
      return;
    } else {
      if (notification.userInteraction) {
        if (notification.data.chat_room_id) {
          NavigationService.navigate('ChatRoomScreen', { chatRoomId: notification.data.chat_room_id });
        }
      }

      return;
    }
  }

  if (Platform.OS === 'ios') {
    NavigationService.navigate('ChatRoomScreen', { chatRoomId: notification.data.chat_room_id });
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  } else {
    if (!notification.userInteraction) {
      PushNotification.localNotification(notification.data);
    } else {
      NavigationService.navigate('ChatRoomScreen', { chatRoomId: notification.chat_room_id });
    }
  }
}
