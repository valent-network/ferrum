import * as ActionTypes from '../actions/actionTypes';
import equal from 'react-fast-compare';

const initialAd = {
  images: [],
  prices: [],
  options: [],
};
const initialState = {
  currentAd: initialAd,
  isLoading: false,
  askFriendsIsLoading: true,
  shouldReset: false,
};

export default function starredAdReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_STARRED_AD_SUCCESS:
      return {
        ...state,
        currentAd: action.ad,
        isLoading: false,
      };
    case ActionTypes.GET_STARRED_AD_STARTED:
      return {
        ...state,
        isLoading: true,
        askFriendsIsLoading: true,
      };
    case ActionTypes.GET_STARRED_AD_FAILED:
      return initialState;
    case ActionTypes.GET_STARRED_AD_FRIENDS_STARTED:
      return {
        ...state,
        askFriendsIsLoading: true,
      };
    case ActionTypes.GET_STARRED_AD_FRIENDS_FAILED:
      return {
        ...state,
        askFriendsIsLoading: false,
      };
    case ActionTypes.GET_STARRED_AD_FRIENDS_SUCCESS:
      return {
        ...state,
        currentAdFriends: action.adFriends,
        askFriendsIsLoading: false,
      };
    case ActionTypes.LIKE_AD:
      return {
        ...state,
        currentAd: {
          ...state.currentAd,
          favorite: true,
        },
      };
    case ActionTypes.UNLIKE_AD:
      return {
        ...state,
        currentAd: {
          ...state.currentAd,
          favorite: false,
        },
      };
    case ActionTypes.DELETE_AD_STARTED:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: true}
      }
    case ActionTypes.DELETE_AD_SUCCESS:
      const deletedCurrentAd = action.adId === state.currentAd.id;

      return {
        ...state,
        currentAd: deletedCurrentAd ? initialAd : {...state.currentAd, actionsLoading: false}
      }
    case ActionTypes.DELETE_AD_FAILED:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: false}
      }
    case ActionTypes.UPDATE_AD_SUCCESS:
      return {
        ...state,
        currentAd: action.ad
      }
    case ActionTypes.ARCHIVE_AD_STARTED:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: true}
      }
    case ActionTypes.ARCHIVE_AD_SUCCESS:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: false, deleted: true}
      }
    case ActionTypes.ARCHIVE_AD_FAILED:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: false}
      }
    case ActionTypes.UNARCHIVE_AD_STARTED:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: true}
      }
    case ActionTypes.UNARCHIVE_AD_FAILED:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: false}
      }
    case ActionTypes.UNARCHIVE_AD_SUCCESS:
      return {
        ...state,
        currentAd: {...state.currentAd, actionsLoading: false, deleted: false}
      }
    case ActionTypes.RESET_STARRED_AD:
      return {
        ...state,
        currentAd: initialAd,
        shouldReset: true,
      }
    case ActionTypes.REMOVE_RESET_STARRED_AD:
      return {
        ...state,
        shouldReset: false,
      }
    default:
      return state;
  }
}
