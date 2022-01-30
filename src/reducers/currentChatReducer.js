import * as ActionTypes from '../actions/actionTypes';
import equal from 'react-fast-compare';

import { mergeArraysKeepNew } from '../Utils';

const initialState = {
  friends: [],
  isLoadingSettings: false,
  messages: [],
  lastLoaded: true,
  chatMetaData: {
    chat_room_users: [],
  },
};

export default function currentChatReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_CHAT_AD_FRIENDS_STARTED:
      return {
        ...state,
        isLoadingSettings: true,
      };
    case ActionTypes.GET_CHAT_AD_FRIENDS_FAILED:
      return {
        ...state,
        isLoadingSettings: false,
      };
    case ActionTypes.GET_CHAT_AD_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: equal(state.friends, action.friends) ? state.friends : action.friends,
        chatMetaData: equal(state.chatMetaData, action.chat) ? state.chatMetaData : action.chat,
        isLoadingSettings: false,
      };
    case ActionTypes.SET_CURRENT_CHAT:
      if (parseInt(action.chatRoomId) === state.id) {
        return state;
      }

      return {
        ...state,
        id: parseInt(action.chatRoomId),
      };
    case ActionTypes.ADD_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case ActionTypes.POST_MESSAGE:
      return {
        ...state,
        messages: mergeArraysKeepNew([...state.messages, action.message], (it) => it._id).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      };
    case ActionTypes.POST_MESSAGE_SUCCESS:
      if (action.chat.id !== state.id) {
        return state;
      }
      return {
        ...state,
        messages: mergeArraysKeepNew([...state.messages, ...action.chat.messages], (it) => it._id).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      };
    case ActionTypes.SYNC_MESSAGES_STARTED:
      return {
        ...state,
        isLoadingSettings: true,
      };
    case ActionTypes.SYNC_MESSAGES_SUCCESS:
      const newMessages = mergeArraysKeepNew([...state.messages, ...action.messages], (it) => it._id).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      return {
        ...state,
        lastLoaded: action.messages.length < 20,
        chatMetaData: equal(state.chatMetaData, action.chat) ? state.chatMetaData : action.chat,
        messages: equal(state.messages, newMessages) ? state.messages : newMessages,
        isLoadingSettings: false,
      };
    case ActionTypes.MESSAGE_WAS_DELETED:
      if (state.id !== action.chat_room_id) {
        return state;
      } else {
        return {
          ...state,
          messages: state.messages.filter((m) => m._id !== action.id),
        };
      }
    case ActionTypes.MESSAGE_IS_DELETING:
      if (action.message.chat_room_id !== state.id) {
        return state;
      } else {
        return {
          ...state,
          messages: state.messages.map((m) => (m._id === action.message._id ? { ...m, pending: true } : m)),
        };
      }
    case ActionTypes.RESET_CURRENT_CHAT:
      return {
        ...state,
        id: undefined,
        messages: [],
      };
    default:
      return state;
  }
}
