import * as ActionTypes from 'actions/types';
import API from 'services/API';
import { displayError } from 'actions/errors';
import equal from 'react-fast-compare';

import Navigation from 'services/Navigation';

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
  return function (dispatch, getState) {
    const state = getState();
    const currentCategory = state.settings.categories.filter((c) => c.id == state.filters.category_id)[0];
    const filterableOpts = currentCategory?.ad_option_types.map((opt) => opt.name) || [];
    const filterType = [...filterableOpts, 'hops_count', 'category_id'].filter((f) => f === filterKey).length
      ? ActionTypes.FILTER_CHANGED_ARRAY
      : ActionTypes.FILTER_CHANGED;
    const existingFilterValue = state.filters[filterKey];

    switch (filterType) {
      case ActionTypes.FILTER_CHANGED:
        dispatch({ type: filterType, filterKey: filterKey, filterValue: filterValue });
        break;
      case ActionTypes.FILTER_CHANGED_ARRAY:
        if (!existingFilterValue?.filter((fv) => fv.id == filterValue.id).length) {
          dispatch({ type: filterType, filterKey: filterKey, filterValue: filterValue.id });
        }
        break;
    }

    dispatch(getAll());
  };
}

export function resetFilters() {
  return function (dispatch) {
    dispatch({ type: ActionTypes.FILTER_RESET });
    dispatch(getAll());
  };
}

export function filterByContact(name) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.FILTER_RESET });
    dispatch(applyFilter('query', name));
    Navigation.navigate('FeedScreen');
  };
}
