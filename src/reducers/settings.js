import * as ActionTypes from 'actions/types';

const initialState = {
  citiesByRegion: {},
  categories: [],
  currentTabAdsLists: 'favoriteAds',
};

export default function settings(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_SETTINGS_SUCCESS:
      return {
        ...state,
        citiesByRegion: action.settings.cities,
        categories: action.settings.categories,
      };
    case ActionTypes.SET_CURRENT_TAB_ADS_LISTS:
      return {
        ...state,
        currentTabAdsLists: action.tabName,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
