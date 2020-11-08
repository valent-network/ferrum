import * as ActionTypes from '../actions/actionTypes.js';
import API from '../services/API';
import { displayError } from '../actions/errorsActions';
import equal from 'react-fast-compare';

import NavigationService from '../services/NavigationService';

export function getAll() {
  return function (dispatch, getState) {
    const state = getState();

    dispatch({ type: ActionTypes.GET_FEED_STARTED });
    const filters = state.filters;

    return API.getFeed(0, filters)
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_FEED_SUCCESS, ads: payload.data });
        if (!equal(payload.data, state.feed.ads)) {
          dispatch({ type: ActionTypes.GET_FEED_NEW_ADS, ads: payload.data });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_FEED_FAILED });
        displayError(error);
      });
  };
}

export function loadMoreAds() {
  return function (dispatch, getState) {
    const state = getState();
    const offset = state.feed.ads.length;
    const filters = state.filters;

    dispatch({ type: ActionTypes.GET_FEED_WITH_OFFSET_STARTED });
    return API.getFeed(offset, filters)
      .then((payload) => {
        dispatch({ type: ActionTypes.GET_FEED_WITH_OFFSET_SUCCESS, ads: payload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_FEED_WITH_OFFSET_FAILED });
        displayError(error);
      });
  };
}

export function applyFilter(filterKey, filterValue) {
  const filterType = ['gears', 'wheels', 'fuels', 'carcasses'].filter((f) => f === filterKey).length
    ? ActionTypes.FILTER_CHANGED_ARRAY
    : ActionTypes.FILTER_CHANGED;

  return function (dispatch) {
    dispatch({ type: filterType, filterKey: filterKey, filterValue: filterValue });
    dispatch(getAll());
  };
}

export function resetFilters() {
  return function (dispatch) {
    dispatch({ type: ActionTypes.FILTER_RESET });
    dispatch(getAll());
  };
}

export function updateFilterValues() {
  return function (dispatch) {
    return API.getFilters()
      .then((payload) => {
        dispatch({ type: ActionTypes.FILTER_VALUES_UPDATE, filterValues: payload.data });
      })
      .catch((error) => {
        displayError(error);
      });
  };
}

export function filterByContact(name) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.FILTER_RESET });
    dispatch(applyFilter('query', name));
    NavigationService.navigate('FeedScreen');
  };
}
