import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { notification } from 'utils';
import i18n from 'services/i18n';

function showNotification(title, message) {
  if (Platform.OS === 'ios') {
    notification.ref.show({ message: { title, message } });
  } else {
    PushNotification.localNotification({
      title: title,
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
    // console.warn(response.data)
    // const message = response.data.message ? response.data.message : response.data;
    if (response.data.message) {
      showNotification(response.data.message, response.data.errors);
    } else {
      showNotification(response.data);
    }
    // showNotification(message);
  } else if (error.request) {
    showNotification(i18n.t('errors.connectionErrorMessage'));
  } else {
    console.warn(error);
  }
}
