import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  gears: [],
  wheels: [],
  carcasses: [],
  fuels: [],
  hops_count: [],
};

export default function filtersValuesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.FILTER_VALUES_UPDATE:
      return action.filterValues;
    default:
      return state;
  }
}
