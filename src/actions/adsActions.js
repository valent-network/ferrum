import * as ActionTypes from './actionTypes.js';
import API from '../services/API';
import { displayError } from '../actions/errorsActions';

import NavigationService from '../services/NavigationService';

export function loadAd(id) {
  return function (dispatch, getState) {
    const shouldReset = getState().feedAd.currentAd.id !== id;

    dispatch({ type: ActionTypes.GET_AD_STARTED, reset: shouldReset });
    dispatch(getAdFriends(id));
    return API.getAd(id)
      .then((adPayload) => {
        dispatch({ type: ActionTypes.GET_AD_SUCCESS, ad: adPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_AD_FAILED });
        displayError(error);
        NavigationService.popToTop();
      });
  };
}

export function loadAdToStarred(id) {
  return function (dispatch, getState) {
    const shouldReset = getState().starredAd.currentAd.id !== id;

    dispatch({ type: ActionTypes.GET_STARRED_AD_STARTED, reset: shouldReset });
    dispatch(getAdFriendsToStarred(id));
    return API.getAd(id)
      .then((adPayload) => {
        dispatch({ type: ActionTypes.GET_STARRED_AD_SUCCESS, ad: adPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_STARRED_AD_FAILED });
        displayError(error);
        NavigationService.popToTop();
      });
  };
}

export function getAdFriends(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_AD_FRIENDS_STARTED });

    return API.getAdFriends(adId)
      .then((adFriendsPayload) => {
        dispatch({ type: ActionTypes.GET_AD_FRIENDS_SUCCESS, adFriends: adFriendsPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_AD_FRIENDS_FAILED });
        displayError(error);
      });
  };
}

export function getAdFriendsToStarred(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_STARRED_AD_FRIENDS_STARTED });

    return API.getAdFriends(adId)
      .then((adFriendsPayload) => {
        dispatch({ type: ActionTypes.GET_STARRED_AD_FRIENDS_SUCCESS, adFriends: adFriendsPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_STARRED_AD_FRIENDS_FAILED });
        displayError(error);
      });
  };
}

export function createAd(adParams, resetForm) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CREATE_AD_STARTED, adParams: adParams });
    return API.createAd(adParams)
              .then((payload) => {
                dispatch({ type: ActionTypes.CREATE_AD_SUCCESS, ad: payload.data });
                NavigationService.push('MyAdScreen', { id: payload.data.id });
                resetForm();
              })
              .catch((error) => {
                dispatch({ type: ActionTypes.CREATE_AD_FAILED, adParams: adParams });
                displayError(error);
              })
  }
}

export function updateAd(adParams, resetForm) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_AD_STARTED, adParams: adParams });
    return API.updateAd(adParams)
              .then((payload) => {
                dispatch({ type: ActionTypes.UPDATE_AD_SUCCESS, ad: payload.data });
                NavigationService.push('MyAdScreen', { id: payload.data.id });
                resetForm();
              })
              .catch((error) => {
                dispatch({ type: ActionTypes.UPDATE_AD_FAILED, adParams: adParams });
                displayError(error);
              })
  }
}

export function deleteAd(adId) {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.DELETE_AD_STARTED, adId: adId });
    return API.deleteAd(adId)
              .then((payload) => {
                const state = getState();
                dispatch({ type: ActionTypes.DELETE_AD_SUCCESS, adId: adId });
                NavigationService.popToTop();
                if (adId === state.starredAd.currentAd.id) { dispatch({ type: ActionTypes.RESET_STARRED_AD }); }
                if (adId === state.feedAd.currentAd.id) { dispatch({ type: ActionTypes.RESET_FEED_AD }); }
              })
              .catch((error) => {
                dispatch({ type: ActionTypes.DELETE_AD_STARTED, adId: adId });
                displayError(error);
              });
  }
}

export function archiveAd(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ARCHIVE_AD_STARTED, adId: adId });
    return API.updateAd({ id: adId, deleted: true})
              .then((payload) => {
                dispatch({ type: ActionTypes.ARCHIVE_AD_SUCCESS, adId: adId });
              })
              .catch((error) => {
                dispatch({ type: ActionTypes.ARCHIVE_AD_FAILED, adId: adId });
                displayError(error);
              });
  }
}


export function unarchiveAd(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UNARCHIVE_AD_STARTED, adId: adId });
    return API.updateAd({ id: adId, deleted: false})
                .then((payload) => {
                  dispatch({ type: ActionTypes.UNARCHIVE_AD_SUCCESS, adId: adId });
                })
                .catch((error) => {
                  dispatch({ type: ActionTypes.UNARCHIVE_AD_FAILED, adId: adId });
                  displayError(error);
                })
  }
}
