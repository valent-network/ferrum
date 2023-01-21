import * as ActionTypes from './actions/actionTypes.js';
import API from './services/API';
import { displayError } from './actions/errorsActions';

export function getSettings() {
  return function (dispatch) {
    dispatch({ type: ActionTypes.GET_SETTINGS_STARTED });
    return API.getSettings()
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_SETTINGS_SUCCESS, settings: payload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_SETTINGS_FAILED });
        displayError(error);
      });
  };
}
