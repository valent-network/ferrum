import FastImage from 'react-native-fast-image';
import * as ActionTypes from 'actions/types';
import API from 'services/API';
import { displayError } from 'actions/errors';
import {
  setAccessToken,
  clearAccessToken,
  setWizardDoneValue,
  setAuthPhone,
  clearAuthPhone,
} from 'services/AsyncStorage';
import i18n from 'services/i18n';
import { serverChannel } from 'services/ServerChannel';

export function signIn(phone, code) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.SIGN_IN_STARTED });

    return API.signIn(phone, code)
      .then((signInPayload) => {
        const token = signInPayload.data.access_token;
        setAccessToken(token);
        API.setAccessToken(token);
        clearAuthPhone().then((phone) => {
          dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, token: token });
        });
      })
      .catch((error) => {
        clearAccessToken();
        API.clearAccessToken();
        clearAuthPhone();
        dispatch({ type: ActionTypes.SIGN_IN_FAILED });
        displayError(error);
      });
  };
}

export function requestCode(phone) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.REQUEST_CODE_STARTED });

    return API.requestCode(phone)
      .then((requestCodePayload) => {
        if (requestCodePayload.data.message === 'ok') {
          setAuthPhone(phone);
          dispatch({ type: ActionTypes.REQUEST_CODE_SUCCESS });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.REQUEST_CODE_FAILED });
        displayError(error);
      });
  };
}

export function signOut(all) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.SIGN_OUT_STARTED });

    return API.signOut(all)
      .then((signOutPayload) => {
        if (signOutPayload.data.message === 'ok') {
          clearAccessToken();
          FastImage.clearMemoryCache();
          FastImage.clearDiskCache();
          API.clearAccessToken();
          clearAuthPhone().then((phone) => {
            dispatch({ type: ActionTypes.SIGN_OUT_SUCCESS });
          });
          serverChannel.disconnect();
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SIGN_OUT_FAILED });
        setAuthPhone(undefined);
        displayError(error);
      });
  };
}

export function changePhone(phone) {
  return { type: ActionTypes.AUTH_PHONE_CHANGED, phone: phone };
}

export function phoneIsInvalidFormat() {
  return {
    type: ActionTypes.AUTH_PHONE_IS_INVALID_FORMAT,
    message: i18n.t('session.errors.authPhoneInvalidFormat'),
  };
}

export function changeCode(code) {
  return { type: ActionTypes.AUTH_CODE_CHANGED, code: code };
}

export function codeIsInvalidFormat() {
  return {
    type: ActionTypes.AUTH_CODE_IS_INVALID_FORMAT,
    message: i18n.t('session.errors.authCodeInvalidFormat'),
  };
}

export function onReset() {
  return function (dispatch) {
    clearAuthPhone().then(() => {
      dispatch({ type: ActionTypes.AUTH_RESET });
    });
  };
}

export function setWizardDone() {
  return function (dispatch) {
    setWizardDoneValue('true');
    dispatch({ type: ActionTypes.SET_WIZARD_DONE });
  };
}
