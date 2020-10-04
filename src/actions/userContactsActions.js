import * as ActionTypes from './actionTypes.js';
import API from '../services/API';
import { displayError } from '../actions/errorsActions';

import Contacts from 'react-native-contacts';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import equal from 'react-fast-compare';

import { getAll as getFeed } from '../Feed/feedActions';
import { getAll as getContacts } from '../UserContacts/userContactsActions';

const contactsPermissionName = Platform.select({
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
  ios: PERMISSIONS.IOS.CONTACTS,
});

let interval;

export function tryUpdateContacts() {
  return function(dispatch, getState) {
    check(contactsPermissionName).then(result => {
      switch (result) {
        case RESULTS.GRANTED:
          Contacts.getAll((err, contacts) => {
            const contactsNormalizer = c => {
              const normalizedName = [c.givenName, c.middleName, c.familyName, c.company].filter(Boolean).join(' ');

              return {
                name: normalizedName,
                phoneNumbers: c.phoneNumbers.map(p => p.digits || p.number),
              };
            };
            const normalizedContacts = contacts.filter(c => c.phoneNumbers).map(contactsNormalizer);
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
  return function(dispatch) {
    check(contactsPermissionName).then(result => {
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
  return function(dispatch) {
    request(contactsPermissionName).then(result => {
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
  return function(dispatch, getState) {
    dispatch({ type: ActionTypes.UPDATE_CONTACTS_STARTED });

    clearInterval(interval);

    // TODO: 2 corner cases
    // first - when there are some contacts BUT none of them are valid (non Ukrainian for example)
    // second - when combined with no permission to contacts
    if (contacts.length > 0) {
      interval = setInterval(() => { manageInitialUpload(dispatch, getState) }, 5000)
    }

    return API.updateContacts(contacts)
      .then(payload => {
        dispatch({ type: ActionTypes.UPDATE_CONTACTS_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.UPDATE_CONTACTS_FAILED });
        displayError(error);
      });
  };
}

function manageInitialUpload(dispatch, getState) {
      const state = getState();
      const adsPresent = state.feed.ads.length > 0;
      const filtersPresent = Object.values(state.filters).filter(f => f.length > 0).length > 0;

      if (adsPresent && !filtersPresent) {
        clearInterval(interval)
        dispatch({type: ActionTypes.UPDATE_CONTACTS_INITIAL_FINISHED})
      } else {
        dispatch(getFeed());
        dispatch(getContacts());
      }
    }

