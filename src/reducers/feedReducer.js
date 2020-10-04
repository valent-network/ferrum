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
  ads: [],
  isLoading: true,
};

export default function feedRedducer(state = initialSetting, action = {}) {
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
        ads: action.ads
      };
    case ActionTypes.GET_FEED_NEW_ADS:
      const newAds = action.ads.map(ad => {
        const oldAd = state.ads.filter(prevAd => ad.id === prevAd.id)[0];
        return equal(ad, oldAd) ? oldAd : ad;
      });
      return {
        ...state,
        isLoading: false,
        ads: newAds,
      };
    case ActionTypes.GET_FEED_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_AD_SUCCESS:
      return {
        ...state,
        ads: state.ads.map(ad => (ad.id === action.ad.id ? { ...ad, visited: true } : ad)),
      };
    case ActionTypes.GET_FEED_WITH_OFFSET_SUCCESS:
      return {
        ...state,
        ads:  mergeArraysKeepNew([...state.ads, ...action.ads], it => it.id)
        
      }
    case ActionTypes.GET_FEED_WITH_OFFSET_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
