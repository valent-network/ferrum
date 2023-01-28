import * as ActionTypes from 'actions/types';

const initialState = {
  filtersValues: {
    price: '',
    hops_count: [],
  },
  citiesByRegion: {},
  categories: [],
  currentTabAdsLists: 'favoriteAds',
};

export default function settings(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_SETTINGS_SUCCESS:
      return {
        ...state,
        filtersValues: action.settings.filters,
        citiesByRegion: action.settings.cities,
        categories: action.settings.categories,
      };
    case ActionTypes.SET_CURRENT_TAB_ADS_LISTS:
      return {
        ...state,
        currentTabAdsLists: action.tabName,
      };
    default:
      return state;
  }
}
