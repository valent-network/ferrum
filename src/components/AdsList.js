import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';
import FastImage from 'react-native-fast-image';

import { activeColor, textColor, spinnerColor } from 'colors';

import AdsListItem from './AdsListItem';
import ListNotFound from './ListNotFound';

import { loadMoreAds as loadMoreAdsFavorite, getAll as getAllFavorite } from 'actions/favoriteAds';
import { loadMoreAds as loadMoreAdsMyAds, getAll as getAllMyAds } from 'actions/myAds';
import { loadMoreAds as loadMoreAdsVisited, getAll as getAllVisited } from 'actions/visitedAds';

import { likeAd, unlikeAd } from 'actions/favoriteAds';

class AdsList extends React.PureComponent {
  _keyExtractor = (item) => item.id.toString();

  coverPhotos = (coverPhotos = this.props.ads.flatMap((ad) =>
    ad.images
      .filter((i) => i.position === 0)
      .map((i) => {
        return { uri: i.url };
      }),
  ));

  _onEndReached = async () => {
    this.props.fromFeed ? this.props.loadMoreFeedAds() : this.props.loadMoreAds[this.props.currentTab]();
  };

  componentDidUpdate = () => {
    FastImage.preload(this.coverPhotos);
  };

  componentDidMount = () => {
    FastImage.preload(this.coverPhotos);
  };

  refreshControl = (isLoading) => (
    <RefreshControl
      refreshing={isLoading}
      tintColor={spinnerColor}
      onRefresh={this.props.fromFeed ? this.props.onRefreshFeed : this.props.onRefresh[this.props.currentTab]}
    />
  );

  // https://github.com/facebook/react-native/issues/26610
  flatListBugFix = { right: 1 };

  _renderItem = ({ item, index }) => (
    <AdsListItem ad={item} onPress={this.props.onAdOpened} likeAd={this.props.likeAd} unlikeAd={this.props.unlikeAd} />
  );

  render() {
    const { ads, isLoading, fromFeed } = this.props;

    if (ads.length === 0) {
      return isLoading ? (
        <Spinner color={spinnerColor} />
      ) : (
        <ListNotFound refreshControl={this.refreshControl(isLoading)} fromFeed={fromFeed} />
      );
    }

    return (
      <FlatList
        data={ads}
        initialNumToRender={3}
        scrollIndicatorInsets={this.flatListBugFix}
        refreshControl={this.refreshControl(isLoading)}
        keyExtractor={this._keyExtractor}
        onEndReached={this._onEndReached}
        renderItem={this._renderItem}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTab: state.settings.currentTabAdsLists,
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
