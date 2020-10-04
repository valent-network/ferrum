import * as ActionTypes from '../actions/actionTypes.js';
import API from '../services/API';
import { displayError } from '../actions/errorsActions';
import equal from 'react-fast-compare';
import { notification as UINotification } from '../Utils';

export function loadMoreUserContacts () {
  return function (dispatch, getState) {
    const state = getState();
    const offset = state.userContacts.list.length;

    dispatch({ type: ActionTypes.GET_USER_CONTACTS_WITH_OFFSET_STARTED });
    return API.getUserContacts(offset, state.userContacts.query)
      .then(payload => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_WITH_OFFSET_SUCCESS, list: payload.data });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_WITH_OFFSET_FAILED });
        displayError(error);
      });
  }
}

export function getAll() {
  return function(dispatch, getState) {
    const state = getState();

    dispatch({ type: ActionTypes.GET_USER_CONTACTS_STARTED });
    return API.getUserContacts(0, state.userContacts.query)
      .then(payload => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_SUCCESS, list: payload.data });
        if (!equal(payload.data, state.userContacts.list)) {
          dispatch({ type: ActionTypes.GET_USER_CONTACTS_NEW_CONTACTS, list: payload.data });
        }
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_USER_CONTACTS_FAILED });
        displayError(error);
      });
  };
}

export function deleteContacts() {
  return function(dispatch) {
    dispatch({ type: ActionTypes.DELETE_CONTACTS });

    return API.deleteContacts()
      .then(deleteContactsPayload => {
        dispatch({ type: ActionTypes.DELETE_CONTACTS_SUCCESS });
        UINotification.ref.show({ message: 'Контакты успешно удалены!' })
      })
      .catch(error => {
        dispatch({ type: ActionTypes.DELETE_CONTACTS_FAILED });
        displayError(error);
      });
  };
}

export function updateQuery(query) {
  return function(dispatch) {
    dispatch({ type: ActionTypes.USER_CONTACTS_UPDATE_QUERY, query: query});
    dispatch(getAll());
  }
}
