import { notification } from '../Utils';

export function displayError(error) {
  if (error.response) {
    const response = error.response;
    const message = response.data.message ? response.data.message : response.data;
    notification.ref.show({ message: message });
  } else if (error.request) {
    notification.ref.show({ message: 'Проблемы с подключением к сети' });
  } else {
  }
}
