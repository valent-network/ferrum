import * as ActionTypes from '../actions/actionTypes';

const initialAd = {
  images: [],
  prices: [],
  options: [],
};
const initialState = {
  currentAd: initialAd,
  isLoading: false,
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
        currentAd: action.reset ? {} : state.currentAd,
        isLoading: true,
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
          ...action.ad,
          is_favorite: true,
        },
      };
    case ActionTypes.UNLIKE_AD:
      return {
        ...state,
        currentAd: {
          ...action.ad,
          is_favorite: false,
        },
      };
    default:
      return state;
  }
}
