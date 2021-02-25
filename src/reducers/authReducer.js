import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  phone: '',
  code: '',
  step: 1,
  isLoading: true,
  wizardDone: false,
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.AUTH_PHONE_CHANGED:
      return {
        ...state,
        phone: action.phone,
      };
    case ActionTypes.AUTH_CODE_CHANGED:
      return {
        ...state,
        code: action.code,
      };
    case ActionTypes.REQUEST_CODE_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.PHONE_FROM_CACHE:
      return {
        ...state,
        step: 2,
        phone: `+380${action.phone}`,
      };
    case ActionTypes.REQUEST_CODE_SUCCESS:
      return {
        ...state,
        step: 2,
        isLoading: false,
      };
    case ActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        accessToken: action.token,
        isLoading: false,
      };
    case ActionTypes.SIGN_IN_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.SIGN_OUT_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...initialState,
        isLoading: false,
        wizardDone: state.wizardDone,
      };
    case ActionTypes.SIGN_OUT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case (ActionTypes.AUTH_RESET):
    case (ActionTypes.REQUEST_CODE_FAILED):
      return {
        ...initialState,
        isLoading: false,
        wizardDone: state.wizardDone,
      };
    case ActionTypes.SET_WIZARD_DONE:
      return {
        ...state,
        wizardDone: true,
      };
    default:
      return state;
  }
}
