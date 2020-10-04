import * as ActionTypes from '../actions/actionTypes';

export default function errorReducer(state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        message: action.error.message,
        status: action.error.response && action.error.response.status,
        statusText: action.error.response && action.error.response.statusText,
      };
    default:
      return {};
  }
}
