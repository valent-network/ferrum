import { combineReducers } from 'redux';
import feedReducer from './feedReducer';
import feedAdReducer from './feedAdReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import myAdsReducer from './myAdsReducer';
import visitedAdsReducer from './visitedAdsReducer';
import favoriteAdsReducer from './favoriteAdsReducer';
import userReducer from './userReducer';
import userContactsReducer from './userContactsReducer';
import filtersReducer from './filtersReducer';
import starredAdReducer from './starredAdReducer';
import chatsReducer from './chatsReducer';
import currentChatReducer from './currentChatReducer';
import settingsReducer from './settingsReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  feedAd: feedAdReducer,
  feed: feedReducer,
  error: errorReducer,
  myAds: myAdsReducer,
  visitedAds: visitedAdsReducer,
  favoriteAds: favoriteAdsReducer,
  user: userReducer,
  userContacts: userContactsReducer,
  filters: filtersReducer,
  starredAd: starredAdReducer,
  chats: chatsReducer,
  currentChat: currentChatReducer,
  settings: settingsReducer,
});

export default rootReducer;
