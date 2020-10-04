import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  name: '',
  avatar: ''
}

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_STARTED:
      return {
        ...state,
        isLoading: true
      }
    case ActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        name: action.name,
        avatar: action.avatar,
        isLoading: false
      }
    case ActionTypes.GET_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}
