import * as ActionTypes from 'actions/types';
import equal from 'react-fast-compare';

const initialState = {
  list: [],
  query: '',
  isLoading: false,
  isUploading: false,
  permissionsGiven: true,
  permissionsRequested: true,
};

import { mergeArraysKeepNew } from 'utils';

export default function userContacts(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_USER_CONTACTS_STARTED:
      return {
        ...state,
        isUploading: true,
        isLoading: true,
      };
    case ActionTypes.GET_USER_CONTACTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: equal(state.list, action.list) ? state.list : action.list,
      };
    case ActionTypes.GET_USER_CONTACTS_FAILED:
      return {
        ...state,
        isUploading: false,
        isLoading: false,
      };
    case ActionTypes.GET_USER_CONTACTS_WITH_OFFSET_SUCCESS:
      const newList = mergeArraysKeepNew([...state.list, ...action.list], (it) => it.id);
      return {
        ...state,
        list: equal(state.list, newList) ? state.list : newList,
      };
    case ActionTypes.CONTACTS_PERMISSIONS_MAY_BE_REQUESTED:
      return {
        ...state,
        permissionsRequested: false,
      };
    case ActionTypes.CONTACTS_PERMISSIONS_WERE_REQUESTED:
      return {
        ...state,
        permissionsRequested: true,
      };
    case ActionTypes.CONTACTS_PERMISSIONS_GIVEN:
      return {
        ...state,
        permissionsGiven: true,
        permissionsRequested: true,
      };
    case ActionTypes.CONTACTS_PERMISSIONS_DENIED:
      return {
        ...state,
        permissionsGiven: false,
      };
    case ActionTypes.DELETE_CONTACTS_SUCCESS:
      return {
        ...state,
        list: [],
        isLoading: false,
      };
    case ActionTypes.DELETE_CONTACTS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.DELETE_CONTACTS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.USER_CONTACTS_UPDATE_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case ActionTypes.UPDATE_CONTACTS_INITIAL_FINISHED:
      return {
        ...state,
        isUploading: false,
      };
    case ActionTypes.USER_CONTACTS_TOGGLE_BLOCK_SUCCESS:
      return {
        ...state,
        list: state.list.map((c) => (c.id == action.userContactId ? { ...c, is_blocked: action.blocked } : c)),
      };
    default:
      return state;
  }
}
