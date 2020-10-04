import * as ActionTypes from '../actions/actionTypes';
import equal from 'react-fast-compare';

function mergeArraysKeepNew(data, key) {
  return [
    ...new Map(
      data.map(x => [key(x), x])
    ).values()
  ]
}

const initialSetting = {
  list: [],
  isLoading: true,
};

export default function myAdsRedducer(state = initialSetting, action = {}) {
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
      const newAds = action.list.map(ad => {
        const oldAd = state.list.filter(prevAd => ad.id === prevAd.id)[0];
        return equal(ad, oldAd) ? oldAd : ad;
      });
      return {
        ...state,
        list: newAds,
      };
    case ActionTypes.GET_MY_ADS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_AD_SUCCESS:
      return {
        ...state,
        list: state.list.map(ad => (ad.id === action.ad.id ? { ...ad, visited: true } : ad)),
      };
    case ActionTypes.GET_MY_ADS_WITH_OFFSET_SUCCESS:
      return {
        ...state,
        list:  mergeArraysKeepNew([...state.list, ...action.list], it => it.id)
        
      }
    case ActionTypes.GET_MY_ADS_WITH_OFFSET_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
