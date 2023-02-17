import * as ActionTypes from 'actions/types';
import equal from 'react-fast-compare';
import { mergeArraysKeepNew } from 'utils';

const initialState = { list: [], isLoading: true };

export default function chats(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_ADMIN_CHAT_ROOMS_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_ADMIN_CHAT_ROOMS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.GET_ADMIN_CHAT_ROOMS_SUCCESS:
      const newList = mergeArraysKeepNew([...state.list, ...action.list], (it) => it.id).sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
      );

      return {
        ...state,
        list: equal(state.list, newList) ? state.list : newList,
        isLoading: false,
      };
    case ActionTypes.POST_ADMIN_MESSAGE_SUCCESS:
      return {
        ...state,
        list: newChatList(state.list, action.chat),
      };
    case ActionTypes.ADMIN_MESSAGE_WAS_READ:
      return {
        ...state,
        list: newChatList(state.list, action.chat),
      };
    case ActionTypes.MESSAGE_IS_DELETING:
      const chat = state.list.filter((c) => c.id === action.message.chat_room_id)[0];
      chat.messages = chat.messages.map((m) => (m._id === action.message._id ? { ...m, pending: true } : m));

      return {
        ...state,
        list: newChatList(state.list, chat),
      };
    case ActionTypes.SYNC_MESSAGES_SUCCESS:
      return {
        ...state,
        list: newChatList(state.list, action.chat),
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

function newChatList(oldChatList, newChat) {
  return mergeArraysKeepNew([...oldChatList, newChat], (it) => it.id).sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
  );
}
