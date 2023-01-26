import { combineReducers } from 'redux';
import feed from './feed';
import feedAd from './feedAd';
import error from './error';
import auth from './auth';
import myAds from './myAds';
import visitedAds from './visitedAds';
import favoriteAds from './favoriteAds';
import user from './user';
import userContacts from './userContacts';
import filters from './filters';
import adsListsAd from './adsListsAd';
import chats from './chats';
import currentChat from './currentChat';
import settings from './settings';

const rootReducer = combineReducers({
  auth,
  feedAd,
  feed,
  error,
  myAds,
  visitedAds,
  favoriteAds,
  user,
  userContacts,
  filters,
  adsListsAd,
  chats,
  currentChat,
  settings,
});

export default rootReducer;
