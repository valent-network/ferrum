import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  min_price: '',
  max_price: '',
  min_year: '',
  max_year: '',
  query: '',
  gears: [],
  wheels: [],
  carcasses: [],
  fuels: [],
  hops_count: [],
};

export default function filtersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.FILTER_CHANGED:
      return {
        ...state,
        [action.filterKey]: action.filterValue,
      };
    case ActionTypes.FILTER_CHANGED_ARRAY:
      const isThere = state[action.filterKey].filter((f) => f === action.filterValue).length === 1;
      let newFilter;

      if (action.filterKey === 'hops_count') { // if single-valued filter
        newFilter = isThere ? [] : [action.filterValue]
      } else {
        newFilter = isThere
          ? state[action.filterKey].filter((f) => f !== action.filterValue)
          : state[action.filterKey].concat(action.filterValue);
      }

      return {
        ...state,
        [action.filterKey]: newFilter,
      };
    case ActionTypes.FILTER_RESET:
      return initialState;
    default:
      return state;
  }
}
