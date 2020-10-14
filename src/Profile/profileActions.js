import * as ActionTypes from '../actions/actionTypes.js';
import API from '../services/API';
import { displayError } from '../actions/errorsActions';

export function getProfile () {
  return function (dispatch) {
    dispatch({ type: ActionTypes.GET_PROFILE_STARTED });
    return API.getProfile()
      .then(payload => {
        dispatch({ type: ActionTypes.GET_PROFILE_SUCCESS, name: payload.data.name, avatar: payload.data.avatar, phone_number: payload.data.phone_number, user_contacts_count: payload.data.user_contacts_count });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_PROFILE_FAILED });
        displayError(error);
      });
  }
}

export function updateUserName(name) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.UPDATE_PROFILE_STARTED });
    return API.updateProfile({ name: name })
      .then(payload => {
        dispatch({ type: ActionTypes.GET_PROFILE_SUCCESS, name: payload.data.name, avatar: payload.data.avatar, phone_number: payload.data.phone_number, user_contacts_count: payload.data.user_contacts_count });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.UPDATE_PROFILE_FAILED });
        displayError(error);
      });
  }
}

export function updateUserAvatar(base64ImageData) {
  return function (dispatch) {
    const params = base64ImageData.length ? { avatar: base64ImageData } : { remove_avatar: true }

    dispatch({ type: ActionTypes.UPDATE_PROFILE_STARTED });

    return API.updateProfile(params)
      .then(payload => {
        dispatch({ type: ActionTypes.GET_PROFILE_SUCCESS, name: payload.data.name, avatar: payload.data.avatar, phone_number: payload.data.phone_number, user_contacts_count: payload.data.user_contacts_count });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.UPDATE_PROFILE_FAILED });
        displayError(error);
      });
  }
}
