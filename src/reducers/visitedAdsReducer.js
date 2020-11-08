import * as ActionTypes from '../actions/actionTypes';
import equal from 'react-fast-compare';

import { mergeArraysKeepNew } from '../Utils';

const initialSetting = {
  list: [],
  isLoading: true,
};

export default function visitedAdsRedducer(state = initialSetting, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_VISITED_ADS_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_VISITED_ADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_VISITED_ADS_NEW_ADS:
      const newAds = action.list.map((ad) => {
        const oldAd = state.list.filter((prevAd) => ad.id === prevAd.id)[0];
        return equal(ad, oldAd) ? oldAd : ad;
      });
      return {
        ...state,
        list: equal(state.list, newAds) ? state.list : newAds,
      };
    case ActionTypes.GET_VISITED_ADS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_AD_SUCCESS:
      const t = mergeArraysKeepNew([...state.list, action.ad], (it) => it.id).map((ad) =>
        ad.id === action.ad.id ? (ad.visited ? ad : { ...ad, visited: true }) : ad,
      );

      return {
        ...state,
        list: equal(state.list, t) ? state.list : t,
      };
    case ActionTypes.GET_VISITED_ADS_WITH_OFFSET_SUCCESS:
      const newList = mergeArraysKeepNew([...state.list, ...action.list], (it) => it.id);

      return {
        ...state,
        list: equal(state.list, newList) ? state.list : newList,
      };
    case ActionTypes.GET_VISITED_ADS_WITH_OFFSET_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
