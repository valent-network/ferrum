import * as ActionTypes from '../actions/actionTypes.js';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import API from '../services/API';
import { displayError } from '../actions/errorsActions';
import equal from 'react-fast-compare';
import { notification as UINotification } from '../Utils';

export function loadMoreUserContacts() {
  return function (dispatch, getState) {
    const state = getState();
    const offset = state.userContacts.list.length;

    dispatch({ type: ActionTypes.GET_USER_CONTACTS_WITH_OFFSET_STARTED });
    return API.getUserContacts(offset, state.userContacts.query)
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_WITH_OFFSET_SUCCESS, list: payload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_WITH_OFFSET_FAILED });
        displayError(error);
      });
  };
}

export function getAll() {
  return function (dispatch, getState) {
    const state = getState();

    dispatch({ type: ActionTypes.GET_USER_CONTACTS_STARTED });
    return API.getUserContacts(0, state.userContacts.query)
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_SUCCESS, list: payload.data });
        if (!equal(payload.data, state.userContacts.list)) {
          dispatch({ type: ActionTypes.GET_USER_CONTACTS_NEW_CONTACTS, list: payload.data });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_FAILED });
        displayError(error);
      });
  };
}

export function deleteContacts() {
  return function (dispatch) {
    dispatch({ type: ActionTypes.DELETE_CONTACTS });

    return API.deleteContacts()
      .then((deleteContactsPayload) => {
        const messageText = 'Контакты успешно удалены!';
        dispatch({ type: ActionTypes.DELETE_CONTACTS_SUCCESS });
        if (Platform.OS === 'ios') {
          UINotification.ref.show({ message: messageText });
        } else {
          PushNotification.localNotification({ message: messageText, largeIcon: '', smallIcon: '' });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.DELETE_CONTACTS_FAILED });
        displayError(error);
      });
  };
}

export function updateQuery(query) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.USER_CONTACTS_UPDATE_QUERY, query: query });
    dispatch(getAll());
  };
}

export function toggleBlock(userContactId) {
  return function (dispatch) {
    return API.toggleBlock(userContactId)
      .then((payload) => {
        dispatch({
          type: ActionTypes.USER_CONTACTS_TOGGLE_BLOCK_SUCCESS,
          userContactId: userContactId,
          blocked: payload.data.blocked,
        });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.USER_CONTACTS_TOGGLE_BLOCK_FAILED });
        displayError(error);
      });
  };
}
