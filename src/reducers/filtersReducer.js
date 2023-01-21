import * as ActionTypes from '../actions/actionTypes';

const singleValueFilters = ['hops_count', 'category_id'];

const initialState = {
  min_price: '',
  max_price: '',
  query: '',
  hops_count: [],
  category_id: [],
};

export default function filtersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.FILTER_CHANGED:
      return {
        ...state,
        [action.filterKey]: action.filterValue,
      };
    case ActionTypes.FILTER_CHANGED_ARRAY:
      const filterValues = state[action.filterKey] || [];
      const isSingleValueFilter = !!singleValueFilters.filter(f => f === action.filterKey).length
      const isThere = filterValues.filter((f) => f === action.filterValue).length === 1;
      let newFilter;

      if (isSingleValueFilter) {
        newFilter = isThere ? [] : [action.filterValue];
      } else {
        newFilter = isThere
          ? filterValues.filter((f) => f !== action.filterValue)
          : filterValues.concat(action.filterValue);
      }

      if (action.filterKey === 'category_id' && !newFilter.length) {
        return {
          ...initialState,
          min_price: state.min_price,
          max_price: state.max_price,
          query: state.query,
          hops_count: state.hops_count,
        }
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
