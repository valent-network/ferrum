import * as ActionTypes from 'actions/types';

const initialState = {
  isLoading: false,
  referrerModalVisible: false,
  referrer: {},
  name: '',
  avatar: '',
  contactsProcessed: true,
  unreadMessagesCount: 0,
  unreadAdminMessagesCount: 0,
  stats: {},
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        _id: action.user.id,
        name: action.user.name,
        avatar: action.user.avatar,
        phoneNumber: action.user.phone_number,
        refcode: action.user.refcode,
        referrer: action.user.referrer,
        userContactsCount: action.user.user_contacts_count,
        unreadMessagesCount: action.user.unread_messages_count,
        unreadAdminMessagesCount: action.user.unread_admin_messages_count,
        isLoading: false,
        admin: action.user.admin,
        stats: action.user.stats,
      };
    case ActionTypes.GET_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.DELETE_CONTACTS_SUCCESS:
      return {
        ...state,
        userContactsCount: 0,
        contactsProcessed: true,
      };
    case ActionTypes.UPDATE_CONTACTS_STARTED:
      return {
        ...state,
        contactsProcessed: false,
      };
    case ActionTypes.UPDATE_CONTACTS_FINISHED:
      return {
        ...state,
        contactsProcessed: true,
      };
    case ActionTypes.UPDATE_UNREAD_MESSAGES_COUNT:
      return {
        ...state,
        unreadMessagesCount: action.count,
        unreadAdminMessagesCount: action.systemCount === 0 ? 0 : action.systemCount || state.unreadAdminMessagesCount, // 0 == false <3 JS
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
