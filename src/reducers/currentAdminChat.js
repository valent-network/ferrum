import * as ActionTypes from 'actions/types';
import equal from 'react-fast-compare';

import { mergeArraysKeepNew } from 'utils';

const initialState = {
  isLoadingSettings: false,
  messages: [],
  lastLoaded: true,
  chatMetaData: {
    chat_room_users: [],
  },
};

export default function currentChat(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_ADMIN_CHAT:
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
    case ActionTypes.POST_ADMIN_MESSAGE:
      return {
        ...state,
        messages: mergeArraysKeepNew([...state.messages, action.message], (it) => it._id).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      };
    case ActionTypes.POST_ADMIN_MESSAGE_SUCCESS:
      if (action.chat.id !== state.id) {
        return state;
      }
      const result = mergeArraysKeepNew([...state.messages, ...action.chat.messages], (it) => it._id).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      return {
        ...state,
        messages: result,
      };
    case ActionTypes.SYNC_MESSAGES_STARTED:
      return {
        ...state,
        isLoadingSettings: true,
      };
    case ActionTypes.SYNC_ADMIN_MESSAGES_SUCCESS:
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
    case ActionTypes.RESET_CURRENT_ADMIN_CHAT:
      return initialState;
    case ActionTypes.SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
