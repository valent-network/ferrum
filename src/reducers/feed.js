import * as ActionTypes from 'actions/types';
import equal from 'react-fast-compare';

import { mergeArraysKeepNew } from 'utils';

const initialState = {
  ads: [],
  isLoading: true,
  modalOpened: false,
};

export default function feed(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_FEED_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ads: equal(state.ads, action.ads) ? state.ads : action.ads,
      };
    case ActionTypes.GET_FEED_NEW_ADS:
      const newAds = action.ads.map((ad) => {
        const oldAd = state.ads.filter((prevAd) => ad.id === prevAd.id)[0];
        return equal(ad, oldAd) ? oldAd : ad;
      });
      return {
        ...state,
        isLoading: false,
        ads: equal(state.ads, newAds) ? state.ads : newAds,
      };
    case ActionTypes.GET_FEED_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_AD_SUCCESS:
      const t = mergeArraysKeepNew([...state.ads, action.ad], (it) => it.id).map((ad) =>
        ad.id === action.ad.id ? (ad.visited ? ad : { ...ad, visited: true }) : ad,
      );

      return {
        ...state,
        ads: equal(state.ads, t) ? state.ads : t,
      };
    case ActionTypes.GET_FEED_WITH_OFFSET_SUCCESS:
      return {
        ...state,
        ads: mergeArraysKeepNew([...state.ads, ...action.ads], (it) => it.id),
      };
    case ActionTypes.GET_FEED_WITH_OFFSET_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.DELETE_CONTACTS_SUCCESS:
      return {
        ...state,
        ads: [],
      };
    case ActionTypes.FILTER_MODAL_SWITCH_VISIBILITY:
      return {
        ...state,
        modalOpened: !state.modalOpened,
      };
    case ActionTypes.DELETE_AD_SUCCESS:
      return {
        ...state,
        ads: state.ads.filter((ad) => ad.id != action.adId),
      };
    case ActionTypes.ARCHIVE_AD_SUCCESS:
      return {
        ...state,
        ads: state.ads.map((ad) => (ad.id == action.adId ? { ...ad, deleted: true } : ad)),
      };
    case ActionTypes.UNARCHIVE_AD_SUCCESS:
      return {
        ...state,
        ads: state.ads.map((ad) => (ad.id == action.adId ? { ...ad, deleted: false } : ad)),
      };
    case ActionTypes.LIKE_AD:
      return {
        ...state,
        ads: state.ads.map((ad) => (ad.id == action.ad.id ? { ...ad, favorite: true } : ad)),
      };
    case ActionTypes.UNLIKE_AD:
      return {
        ...state,
        ads: state.ads.map((ad) => (ad.id == action.ad.id ? { ...ad, favorite: false } : ad)),
      };
    case ActionTypes.UPDATE_AD_SUCCESS:
      return {
        ...state,
        ads: state.ads.map((ad) => (ad.id == action.ad.id ? action.ad : ad)),
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
