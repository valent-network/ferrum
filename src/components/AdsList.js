import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';
import FastImage from 'react-native-fast-image';

import { activeColor, textColor, spinnerColor } from 'colors';

import AdsListItem from './AdsListItem';
import ListNotFound from './ListNotFound';
import FriendPickerModal from 'components/FriendPicker/FriendPickerModal';

import { loadMoreAds as loadMoreAdsFavorite, getAll as getAllFavorite } from 'actions/favoriteAds';
import { loadMoreAds as loadMoreAdsMyAds, getAll as getAllMyAds } from 'actions/myAds';
import { loadMoreAds as loadMoreAdsVisited, getAll as getAllVisited } from 'actions/visitedAds';

import { likeAd, unlikeAd } from 'actions/favoriteAds';

// https://github.com/facebook/react-native/issues/26610
const flatListBugFix = { right: 1 };

const _keyExtractor = (item) => item.id.toString();

const coverPhotos = (ads) =>
  ads.flatMap((ad) =>
    ad.images
      .filter((i) => i.position === 0)
      .map((i) => {
        return { uri: i.url };
      }),
  );

function AdsList({
  ads,
  isLoading,
  fromFeed,
  initialContactsProcessing,
  currentTab,
  loadMoreFeedAds,
  onRefreshFeed,
  onRefresh,
  onAdOpened,
  likeAd,
  unlikeAd,
  loadMoreAds,
}) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentAdId, setCurrentAdId] = useState();
  const refreshControl = (
    <RefreshControl
      refreshing={isLoading}
      tintColor={spinnerColor}
      onRefresh={fromFeed ? onRefreshFeed : onRefresh[currentTab]}
    />
  );

  const _onEndReached = async () => {
    fromFeed ? loadMoreFeedAds() : loadMoreAds[currentTab]();
  };

  const openPicker = (adId) => {
    setCurrentAdId(adId);
    setPickerVisible(true);
  };

  const _renderItem = ({ item, index }) => (
    <AdsListItem
      ad={item}
      onPress={onAdOpened}
      likeAd={likeAd}
      unlikeAd={unlikeAd}
      openChat={() => openPicker(item.id)}
    />
  );

  useEffect(() => {
    FastImage.preload(coverPhotos(ads));
  }, [ads]);

  if (fromFeed && initialContactsProcessing) return null;

  if (ads.length === 0) {
    return isLoading ? (
      <Spinner color={spinnerColor} />
    ) : (
      <ListNotFound refreshControl={refreshControl} fromFeed={fromFeed} />
    );
  }

  return (
    <>
      <FlatList
        data={ads}
        initialNumToRender={3}
        scrollIndicatorInsets={flatListBugFix}
        refreshControl={refreshControl}
        keyExtractor={_keyExtractor}
        onEndReached={_onEndReached}
        renderItem={_renderItem}
      />
      <FriendPickerModal visible={pickerVisible} adId={currentAdId} onClose={() => setPickerVisible(false)} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentTab: state.settings.currentTabAdsLists,
    initialContactsProcessing: !state.user.contactsProcessed && state.user.userContactsCount === 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
    loadMoreAds: {
      visitedAds: () => dispatch(loadMoreAdsVisited()),
      myAds: () => dispatch(loadMoreAdsMyAds()),
      favoriteAds: () => dispatch(loadMoreAdsFavorite()),
    },
    onRefresh: {
      visitedAds: () => dispatch(getAllVisited()),
      myAds: () => dispatch(getAllMyAds()),
      favoriteAds: () => dispatch(getAllFavorite()),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsList);

AdsList.propTypes = {
  ads: PropTypes.array.isRequired,
};
