import * as ActionTypes from '../actions/actionTypes.js';
import API from '../services/API';
import { displayError } from '../actions/errorsActions';
import equal from 'react-fast-compare';

export function loadMoreAds () {
  return function (dispatch, getState) {
    const state = getState();
    const offset = state.visitedAds.list.length;

    dispatch({ type: ActionTypes.GET_VISITED_ADS_WITH_OFFSET_STARTED });
    return API.getVisitedAds(offset)
      .then(payload => {
        dispatch({ type: ActionTypes.GET_VISITED_ADS_WITH_OFFSET_SUCCESS, list: payload.data });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_VISITED_ADS_WITH_OFFSET_FAILED });
        displayError(error);
      });
  }
}

export function getAll() {
  return function(dispatch, getState) {
    const state = getState();

    dispatch({ type: ActionTypes.GET_VISITED_ADS_STARTED });
    return API.getVisitedAds()
      .then(payload => {
        dispatch({ type: ActionTypes.GET_VISITED_ADS_SUCCESS });
        if (!equal(payload.data, state.visitedAds.list)) {
          dispatch({ type: ActionTypes.GET_VISITED_ADS_NEW_ADS, list: payload.data });
        }
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_VISITED_ADS_FAILED });
        displayError(error);
      });
  };
}
