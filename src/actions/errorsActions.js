import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { notification } from '../Utils';

function showNotification(message) {
  if (Platform.OS === 'ios') {
    notification.ref.show({ message: message });
  } else {
    PushNotification.localNotification({
      title: 'К сожалению, произошла ошибка :(',
      message: message,
      largeIcon: '',
      smallIcon: '',
      channelId: 'messages',
    });
  }
}

export function displayError(error) {
  if (error.response) {
    const response = error.response;
    const message = response.data.message ? response.data.message : response.data;
    showNotification(message);
  } else if (error.request) {
    showNotification('Проблемы с подключением к сети');
  } else {
  }
}
