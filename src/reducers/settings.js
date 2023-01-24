import * as ActionTypes from 'actions/types';

const initialState = {
  filtersValues: {
    price: '',
    hops_count: [],
  },
  citiesByRegion: {},
  categories: [],
};

export default function settings(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_SETTINGS_SUCCESS:
      return {
        filtersValues: action.settings.filters,
        citiesByRegion: action.settings.cities,
        categories: action.settings.categories,
      };
    default:
      return state;
  }
}
