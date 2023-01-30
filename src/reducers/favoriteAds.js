import * as ActionTypes from 'actions/types';
import equal from 'react-fast-compare';

import { mergeArraysKeepNew } from 'utils';

const initialState = {
  list: [],
  isLoading: true,
};

export default function favoriteAds(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_FAVORITE_ADS_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_FAVORITE_ADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_FAVORITE_ADS_NEW_ADS:
      const newAds = action.list.map((ad) => {
        const oldAd = state.list.filter((prevAd) => ad.id === prevAd.id)[0];
        return equal(ad, oldAd) ? oldAd : ad;
      });
      return {
        ...state,
        list: equal(state.list, newAds) ? state.list : newAds,
      };
    case ActionTypes.GET_FAVORITE_ADS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_FAVORITE_ADS_WITH_OFFSET_SUCCESS:
      const newList = mergeArraysKeepNew([...state.list, ...action.list], (it) => it.id);

      return {
        ...state,
        list: equal(state.list, newList) ? state.list : newList,
      };
    case ActionTypes.GET_FAVORITE_ADS_WITH_OFFSET_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.LIKE_AD:
      return {
        ...state,
        list: [{ ...action.ad, favorite: true }, ...state.list],
      };
    case ActionTypes.UNLIKE_AD:
      return {
        ...state,
        list: state.list.filter((ad) => ad.id !== action.ad.id),
      };
    case ActionTypes.DELETE_AD_SUCCESS:
      return {
        ...state,
        list: state.list.filter((ad) => ad.id != action.adId),
      };
    case ActionTypes.ARCHIVE_AD_SUCCESS:
      return {
        ...state,
        list: state.list.map((ad) => (ad.id == action.adId ? { ...ad, deleted: true } : ad)),
      };
    case ActionTypes.UNARCHIVE_AD_SUCCESS:
      return {
        ...state,
        list: state.list.map((ad) => (ad.id == action.adId ? { ...ad, deleted: false } : ad)),
      };
    case ActionTypes.UPDATE_AD_SUCCESS:
      return {
        ...state,
        list: state.list.map((ad) => (ad.id == action.ad.id ? action.ad : ad)),
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
