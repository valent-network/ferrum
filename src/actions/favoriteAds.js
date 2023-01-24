import * as ActionTypes from 'actions/types';
import API from 'services/API';
import { displayError } from 'actions/errors';
import equal from 'react-fast-compare';

export function loadMoreAds() {
  return function (dispatch, getState) {
    const state = getState();
    const offset = state.favoriteAds.list.length;

    dispatch({ type: ActionTypes.GET_FAVORITE_ADS_WITH_OFFSET_STARTED });
    return API.getFavoriteAds(offset)
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_FAVORITE_ADS_WITH_OFFSET_SUCCESS, list: payload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_FAVORITE_ADS_WITH_OFFSET_FAILED });
        displayError(error);
      });
  };
}

export function getAll() {
  return function (dispatch, getState) {
    const state = getState();

    dispatch({ type: ActionTypes.GET_FAVORITE_ADS_STARTED });
    return API.getFavoriteAds()
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_FAVORITE_ADS_SUCCESS });
        if (!equal(payload.data, state.favoriteAds.list)) {
          dispatch({ type: ActionTypes.GET_FAVORITE_ADS_NEW_ADS, list: payload.data });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_FAVORITE_ADS_FAILED });
        displayError(error);
      });
  };
}

export function likeAd(ad) {
  return function (dispatch) {
    return API.likeAd(ad.id)
      .then((payload) => {
        dispatch({ type: ActionTypes.LIKE_AD, ad: ad });
      })
      .catch((error) => {
        displayError(error);
      });
  };
}

export function unlikeAd(ad) {
  return function (dispatch) {
    return API.unlikeAd(ad.id)
      .then((payload) => {
        dispatch({ type: ActionTypes.UNLIKE_AD, ad: ad });
      })
      .catch((error) => {
        displayError(error);
      });
  };
}
