import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import { activeColor, textColor, spinnerColor } from 'colors';

import AdsListItem from './AdsListItem';
import ListNotFound from './ListNotFound';

import { loadMoreAds as loadMoreAdsFavorite, getAll as getAllFavorite } from 'actions/favoriteAds';
import { loadMoreAds as loadMoreAdsMyAds, getAll as getAllMyAds } from 'actions/myAds';
import { loadMoreAds as loadMoreAdsVisited, getAll as getAllVisited } from 'actions/visitedAds';

import { likeAd, unlikeAd } from 'actions/favoriteAds';

class AdsList extends React.PureComponent {
  _keyExtractor = (item) => item.id.toString();

  _onEndReached = async () => {
    this.props.fromFeed ? this.props.loadMoreFeedAds() : this.props.loadMoreAds[this.props.currentTab]();
  };

  // https://github.com/facebook/react-native/issues/26610
  flatListBugFix = { right: 1 };

  _renderItem = ({ item, index }) => (
    <AdsListItem ad={item} onPress={this.props.onAdOpened} likeAd={this.props.likeAd} unlikeAd={this.props.unlikeAd} />
  );

  render() {
    const { ads, isLoading, fromFeed, onRefreshFeed, onRefresh, currentTab } = this.props;
    const onRefreshTab = fromFeed ? onRefreshFeed : onRefresh[currentTab];
    const refreshControl = isLoading ? (
      <RefreshControl refreshing={true} tintColor={spinnerColor} onRefresh={onRefreshTab} />
    ) : (
      <RefreshControl refreshing={false} tintColor={spinnerColor} onRefresh={onRefreshTab} />
    );

    if (ads.length === 0) {
      return isLoading ? (
        <Spinner color={spinnerColor} />
      ) : (
        <ListNotFound refreshControl={refreshControl} fromFeed={fromFeed} />
      );
    }

    return (
      <FlatList
        data={ads}
        scrollIndicatorInsets={this.flatListBugFix}
        refreshControl={refreshControl}
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
