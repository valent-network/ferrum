import ReactNativeBlobUtil from 'react-native-blob-util';

import * as ActionTypes from 'actions/types';
import API from 'services/API';
import { displayError } from 'actions/errors';

import Navigation from 'services/Navigation';
import { notification as UINotification } from 'utils';
import i18n from 'services/i18n';

export function loadAd(id) {
  return function (dispatch, getState) {
    const shouldReset = getState().feedAd.currentAd.id !== id;

    dispatch({ type: ActionTypes.GET_AD_STARTED, reset: shouldReset });
    dispatch(getAdFriends(id));
    return API.getAd(id)
      .then((adPayload) => {
        dispatch({ type: ActionTypes.GET_AD_SUCCESS, ad: adPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_AD_FAILED });
        displayError(error);
        Navigation.popToTop();
      });
  };
}

export function loadAdToAdsLists(id) {
  return function (dispatch, getState) {
    const shouldReset = getState().adsListsAd.currentAd.id !== id;

    dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_STARTED, reset: shouldReset });
    dispatch(getAdFriendsToAdsLists(id));
    return API.getAd(id)
      .then((adPayload) => {
        dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_SUCCESS, ad: adPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_FAILED });
        displayError(error);
        Navigation.popToTop();
      });
  };
}

export function getAdFriends(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_AD_FRIENDS_STARTED });

    return API.getAdFriends(adId)
      .then((adFriendsPayload) => {
        dispatch({ type: ActionTypes.GET_AD_FRIENDS_SUCCESS, adFriends: adFriendsPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_AD_FRIENDS_FAILED });
        displayError(error);
      });
  };
}

export function getAdFriendsToAdsLists(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_FRIENDS_STARTED });

    return API.getAdFriends(adId)
      .then((adFriendsPayload) => {
        dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_FRIENDS_SUCCESS, adFriends: adFriendsPayload.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.GET_ADS_LISTS_AD_FRIENDS_FAILED });
        displayError(error);
      });
  };
}

export function createAd(adParams, resetForm) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CREATE_AD_STARTED, adParams: adParams });
    return API.createAd(adParams)
      .then((payload) => {
        const messageText = i18n.t('ad.toasts.createSuccess');
        if (Platform.OS === 'ios') {
          UINotification.ref.show({ message: messageText });
        } else {
          PushNotification.localNotification({
            message: messageText,
            largeIcon: '',
            smallIcon: '',
            channelId: 'messages',
          });
        }
        dispatch({ type: ActionTypes.CREATE_AD_SUCCESS, ad: payload.data });
        Navigation.navigate('Ad', { id: payload.data.id });
        resetForm();
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.CREATE_AD_FAILED, adParams: adParams });
        displayError(error);
      });
  };
}

export function updateAd(adParams, resetForm) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_AD_STARTED, adParams: adParams });
    return API.updateAd(adParams)
      .then((payload) => {
        const messageText = i18n.t('ad.toasts.updateSuccess');
        if (Platform.OS === 'ios') {
          UINotification.ref.show({ message: messageText });
        } else {
          PushNotification.localNotification({
            message: messageText,
            largeIcon: '',
            smallIcon: '',
            channelId: 'messages',
          });
        }
        dispatch({ type: ActionTypes.UPDATE_AD_SUCCESS, ad: payload.data });
        Navigation.navigate('Ad', { id: payload.data.id });
        resetForm();
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.UPDATE_AD_FAILED, adParams: adParams });
        displayError(error);
      });
  };
}

export function deleteAd(adId) {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.DELETE_AD_STARTED, adId: adId });
    return API.deleteAd(adId)
      .then((payload) => {
        const state = getState();
        const messageText = i18n.t('ad.toasts.deleteSuccess');
        if (Platform.OS === 'ios') {
          UINotification.ref.show({ message: messageText });
        } else {
          PushNotification.localNotification({
            message: messageText,
            largeIcon: '',
            smallIcon: '',
            channelId: 'messages',
          });
        }
        Navigation.popToTop();
        if (adId === state.adsListsAd.currentAd.id) {
          dispatch({ type: ActionTypes.RESET_ADS_LISTS_AD });
        }
        if (adId === state.feedAd.currentAd.id) {
          dispatch({ type: ActionTypes.RESET_FEED_AD });
        }
        dispatch({ type: ActionTypes.DELETE_AD_SUCCESS, adId: adId });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.DELETE_AD_STARTED, adId: adId });
        displayError(error);
      });
  };
}

export function archiveAd(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ARCHIVE_AD_STARTED, adId: adId });
    return API.updateAd({ id: adId, deleted: true })
      .then((payload) => {
        dispatch({ type: ActionTypes.ARCHIVE_AD_SUCCESS, adId: adId });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ARCHIVE_AD_FAILED, adId: adId });
        displayError(error);
      });
  };
}

export function unarchiveAd(adId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.UNARCHIVE_AD_STARTED, adId: adId });
    return API.updateAd({ id: adId, deleted: false })
      .then((payload) => {
        dispatch({ type: ActionTypes.UNARCHIVE_AD_SUCCESS, adId: adId });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.UNARCHIVE_AD_FAILED, adId: adId });
        displayError(error);
      });
  };
}

export function presignAndUploadToS3({ images, onComplete }) {
  return (dispatch) => {
    const imagesToPresign = images.map((i) => {
      return {
        ext: i.ext,
        content_type: i.content_type,
        position: i.position,
      };
    });
    return API.presign(imagesToPresign).then(({ data }) => {
      const imagesUploadData = images.map((i) => {
        const matched = data.filter((d) => d.position === i.position)[0];

        return {
          ...i,
          key: matched.key,
          presigned_url: matched.presigned_url,
        };
      });
      return uploadPresignedImagesToS3({ images: imagesUploadData, onComplete });
    });
  };
}

export const onAdImagePickerImageSelected =
  ({ currentCollection, attachtImageToForm, onProgress }) =>
  (image, index) => {
    const appendIndex = index + currentCollection.length;
    const ext = image.path.split('.').length > 1 ? image.path.split('.').pop() : null;

    const adImage = {
      position: appendIndex,
      attachment: image.path,
      content_type: image.mime,
      ext: ext,
      path: image.path,
      opacity: 0,
      onProgress: onProgress(appendIndex),
    };

    attachtImageToForm(adImage);

    return adImage;
  };

// PRIVATE

async function uploadPresignedImagesToS3({ images, onComplete }) {
  var promises = [];
  var uploadedImages = [];

  images.map((image) => {
    const headers = {
      'Content-Type': image.content_type,
      'x-amz-acl': 'public-read',
    };

    // https://github.com/axios/axios/issues/1321
    // https://github.com/axios/axios/issues/1321#issuecomment-420941683
    // https://github.com/axios/axios/blob/503418718f669fcc674719fd862b355605d7b41f/lib/adapters/xhr.js#L15-L17
    // https://github.com/joltup/rn-fetch-blob#multipartform-data-example-post-form-data-with-file-and-data
    // https://github.com/RonRadtke/react-native-blob-util
    promises.push(
      ReactNativeBlobUtil.fetch('PUT', image.presigned_url, headers, ReactNativeBlobUtil.wrap(image.path))
        .uploadProgress(image.onProgress)
        .then((res) => {
          uploadedImages.push(image);
        })
        .catch((error) => {
          displayError(error);
        }),
    );
  });

  await Promise.all(promises);

  onComplete(uploadedImages);

  return uploadedImages;
}
