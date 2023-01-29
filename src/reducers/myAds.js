import * as ActionTypes from 'actions/types';
import equal from 'react-fast-compare';

import { mergeArraysKeepNew } from 'utils';

const initialSetting = {
  list: [],
  isLoading: true,
  isCreating: false,
};

export default function myAds(state = initialSetting, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_MY_ADS_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_MY_ADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_MY_ADS_NEW_ADS:
      const newAds = action.list.map((ad) => {
        const oldAd = state.list.filter((prevAd) => ad.id === prevAd.id)[0];
        return equal(ad, oldAd) ? oldAd : ad;
      });
      return {
        ...state,
        list: equal(state.list, newAds) ? state.list : newAds,
      };
    case ActionTypes.GET_MY_ADS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_MY_ADS_WITH_OFFSET_SUCCESS:
      const newList = mergeArraysKeepNew([...state.list, ...action.list], (it) => it.id);

      return {
        ...state,
        list: equal(state.list, newList) ? state.list : newList,
      };
    case ActionTypes.GET_MY_ADS_WITH_OFFSET_FAILED:
      return {
        ...state,
        isLoading: false,
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
    case ActionTypes.CREATE_AD_SUCCESS:
      return {
        ...state,
        isCreating: false,
        list: [action.ad, ...state.list],
      };
    case ActionTypes.CREATE_AD_FAILED:
      return {
        ...state,
        isCreating: false,
      };
    case ActionTypes.CREATE_AD_STARTED:
      return {
        ...state,
        isCreating: true,
      };
    case ActionTypes.UPDATE_AD_FAILED:
      return {
        ...state,
        isUpdating: false,
      };
    case ActionTypes.UPDATE_AD_STARTED:
      return {
        ...state,
        isUpdating: true,
      };
    case ActionTypes.LIKE_AD:
      return {
        ...state,
        list: state.list.map((ad) => (ad.id == action.ad.id ? { ...ad, favorite: true } : ad)),
      };
    case ActionTypes.UNLIKE_AD:
      return {
        ...state,
        list: state.list.map((ad) => (ad.id == action.ad.id ? { ...ad, favorite: false } : ad)),
      };
    case ActionTypes.UPDATE_AD_SUCCESS:
      return {
        ...state,
        list: state.list.map((ad) => (ad.id == action.ad.id ? action.ad : ad)),
        isUpdating: false,
      };
    default:
      return state;
  }
}
