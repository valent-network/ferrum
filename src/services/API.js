import axios from 'axios';
import Qs from 'qs';
import { Platform } from 'react-native';
import { getUniqueId, getReadableVersion } from 'react-native-device-info';
import { store } from 'store';
import * as ActionTypes from 'actions/types';
import { clearAccessToken } from 'services/AsyncStorage';
import { BASE_URL } from 'config';
import { displayError } from 'actions/errors';

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.recar.io/api';
} else {
  baseURL = `http://${BASE_URL}/api`;
}

const apiService = axios.create({
  baseURL: baseURL,
  headers: { contentType: 'application/json' },
  paramsSerializer: {
    serialize: (params) => {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    },
  },
});

apiService.defaults.headers.common['X-User-Access-Token'] = null;

apiService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (typeof error.response !== 'undefined') {
      if (401 === error.response.status) {
        clearAccessToken();
        API.clearAccessToken();
        store.dispatch({ type: ActionTypes.SIGN_OUT_SUCCESS });
      } else {
        return Promise.reject(error);
      }
    } else {
      displayError(error);
    }
  },
);

export default class API {
  static changeLanguage(locale) {
    apiService.defaults.headers.common['X-User-Locale'] = locale;
  }

  static setAccessToken(accessToken) {
    apiService.defaults.headers.common['X-User-Access-Token'] = accessToken;
  }

  static clearAccessToken() {
    apiService.defaults.headers.common['X-User-Access-Token'] = null;
  }

  static getAd(id) {
    return apiService.get(`/v2/ads/${id}`);
  }

  static getAdFriends(id) {
    return apiService.get(`/v2/friendly_ads/${id}`);
  }

  static async signIn(phone, code) {
    let idResolver =
      Platform.os === 'android'
        ? getAndroidId().then((androidId) => androidId)
        : getUniqueId().then((uniqueId) => uniqueId);
    let uniqueId = await idResolver;

    return apiService.put('/v1/sessions', {
      phone_number: phone,
      verification_code: code,
      device_id: uniqueId,
    });
  }

  static requestCode(phone) {
    return apiService.post('/v1/sessions', { phone_number: phone });
  }

  static signOut(all) {
    return apiService.delete('/v1/sessions', { all: !!all });
  }

  static deleteContacts() {
    return apiService.delete('/v1/contact_book');
  }

  static forgot(phone) {
    return apiService.post('/v1/sessions', { phone_number: phone, reset: 1 });
  }

  static updateContacts(contacts) {
    return apiService.put('/v1/contact_book', { contacts: contacts });
  }

  static getFeed(offset = 0, filters = {}) {
    return apiService.get('/v2/feed_ads', {
      params: {
        offset: offset,
        filters: filters,
      },
    });
  }

  static getVisitedAds(offset = 0) {
    return apiService.get(`/v2/visited_ads?offset=${offset}`);
  }

  static getFavoriteAds(offset = 0) {
    return apiService.get(`/v2/favorite_ads?offset=${offset}`);
  }

  static getMyAds(offset = 0) {
    return apiService.get(`/v2/my_ads?offset=${offset}`);
  }

  static getUserContacts(offset = 0, query = '') {
    return apiService.get(`/v1/user_contacts?offset=${offset}&query=${query}`);
  }

  static createFeedbackMessage(messageBody) {
    return apiService.post('/v1/messages', { message: messageBody });
  }

  static getProfile() {
    return apiService.get('/v1/user');
  }

  static getFilters() {
    return apiService.get('/filters');
  }

  static getSettings() {
    return apiService.get('/v1/settings');
  }

  static updateProfile(userParams = {}, deviceParams = {}) {
    return apiService.put('/v1/user', {
      user: userParams,
      device: { ...deviceParams, build_version: getReadableVersion() },
    });
  }

  static likeAd(adId) {
    return apiService.post('/v1/favorite_ads', { id: adId });
  }

  static unlikeAd(adId) {
    return apiService.delete(`/v1/favorite_ads/${adId}`);
  }

  static getChatRooms(offset = 0) {
    return apiService.get(`/v1/chat_rooms?offset=${offset}`);
  }

  static initiateChatRoom(adId, userId, name) {
    return apiService.post('/v1/chat_rooms', { ad_id: adId, user_id: userId, name: name });
  }

  static initiateSystemChatRoom() {
    return apiService.get('/v1/system_chat_room');
  }

  static addUserToChat(chatRoomId, userId, name) {
    return apiService.post('/v1/chat_room_users', { chat_room_id: chatRoomId, user_id: userId, name: name });
  }

  static leaveChat(chatRoomId) {
    return apiService.delete(`/v1/chat_room_users/${chatRoomId}`);
  }

  static getMessages(chatRoomId, offset) {
    return apiService.get(`/v1/messages?chat_room_id=${chatRoomId}&offset=${offset}`);
  }

  static getReferrer(refcode) {
    return apiService.get(`/v1/referrers/${refcode}`);
  }

  static setReferrer(refcode) {
    return apiService.post(`/v1/user/set_referrer`, { refcode: refcode });
  }

  static toggleBlock(userContactId) {
    return apiService.put(`/v1/blocked_user_contacts/${userContactId}`);
  }

  static createAd(adParams) {
    const { title, short_description, description, price, city_id, category_id, options, ad_images, tmp_images } =
      adParams;

    const params = {
      ad: {
        price: price,
        city_id: city_id,
        category_id: category_id,
        ad_query_attributes: { title },
        ad_description_attributes: { body: description, short: short_description },
        ad_extra_attributes: { details: options },
        tmp_images: tmp_images,
      },
    };

    return apiService.post('/v2/ads', params);
  }

  static updateAd(ad) {
    const { title, short_description, description, price, city_id, options, deleted, ad_images, tmp_images } = ad;

    const params = {
      ad: {
        price: price,
        city_id: city_id,
        deleted: deleted,
        ad_query_attributes: { title },
        ad_description_attributes: { body: description, short: short_description },
        ad_extra_attributes: { details: options },
        ad_images_attributes: ad_images,
        tmp_images: tmp_images,
      },
    };

    return apiService.put(`/v2/ads/${ad.id}`, params);
  }

  static deleteAd(adId) {
    return apiService.delete(`/v2/ads/${adId}`);
  }

  static archiveAd(adId) {
    return apiService.delete(`/v2/ads/${adId}/archive`);
  }

  static presign(images) {
    return apiService.post(`/v1/presigner`, { images });
  }
}
