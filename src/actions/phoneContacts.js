import * as ActionTypes from 'actions/types';
import API from 'services/API';
import { displayError } from 'actions/errors';

import Contacts from 'react-native-contacts';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import equal from 'react-fast-compare';

import { getAll as getFeed } from 'actions/feed';
import { getAll as getContacts } from 'actions/userContacts';

const contactsPermissionName = Platform.select({
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
  ios: PERMISSIONS.IOS.CONTACTS,
});

let interval;

export function tryUpdateContacts() {
  return function (dispatch, getState) {
    check(contactsPermissionName).then((result) => {
      switch (result) {
        case RESULTS.GRANTED:
          Contacts.getAll().then((contacts) => {
            const contactsNormalizer = (c) => {
              const normalizedName = [c.givenName, c.middleName, c.familyName, c.company].filter(Boolean).join(' ');

              return {
                name: normalizedName,
                phoneNumbers: c.phoneNumbers.map((p) => p.digits || p.number),
              };
            };
            const normalizedContacts = contacts.filter((c) => c.phoneNumbers).map(contactsNormalizer);
            dispatch(updateContacts(normalizedContacts));
          });
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_GIVEN });
          break;
        case RESULTS.DENIED:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_MAY_BE_REQUESTED });
          break;
        default:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_DENIED });
      }
    });
  };
}

export function checkContactsPermissions() {
  return function (dispatch) {
    check(contactsPermissionName).then((result) => {
      switch (result) {
        case RESULTS.GRANTED:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_GIVEN });
          break;
        case RESULTS.BLOCKED:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_DENIED });
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_WERE_REQUESTED });
          break;
        case RESULTS.DENIED:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_MAY_BE_REQUESTED });
          break;
      }
    });
  };
}

export function requestContactsPermissions() {
  return function (dispatch) {
    request(contactsPermissionName).then((result) => {
      switch (result) {
        case RESULTS.GRANTED:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_GIVEN });
          break;
        case RESULTS.BLOCKED:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_DENIED });
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_WERE_REQUESTED });
          break;
        case RESULTS.DENIED:
          dispatch({ type: ActionTypes.CONTACTS_PERMISSIONS_MAY_BE_REQUESTED });
          break;
      }
    });
  };
}

export function updateContacts(contacts) {
  return function (dispatch, getState) {
    dispatch({ type: ActionTypes.UPDATE_CONTACTS_STARTED });

    return API.updateContacts(contacts)
      .then((payload) => {
        dispatch({ type: ActionTypes.UPDATE_CONTACTS_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.UPDATE_CONTACTS_FAILED });
        displayError(error);
      });
  };
}
