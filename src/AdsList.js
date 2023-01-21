import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import { activeColor, lightColor, spinnerColor } from './Colors';

import AdsListItem from './AdsListItem';
import ListNotFound from './ListNotFound';

class AdsList extends React.PureComponent {
  _keyExtractor = (item) => item.id.toString();

  _onEndReached = async () => {
    this.props.loadMoreAds();
  };

  // https://github.com/facebook/react-native/issues/26610
  flatListBugFix = { right: 1 };

  onRefresh = this.props.onRefresh;
  refreshControlLoading = (<RefreshControl refreshing={true} tintColor={lightColor} onRefresh={this.onRefresh} />);
  refreshControlStable = (<RefreshControl refreshing={false} tintColor={lightColor} onRefresh={this.onRefresh} />);

  _renderItem = ({ item, index }) => (
    <AdsListItem ad={item} onPress={this.props.onAdOpened} likeAd={this.props.likeAd} unlikeAd={this.props.unlikeAd} />
  );

  render() {
    const { ads, isLoading, fromFeed } = this.props;
    const refreshControl = isLoading ? this.refreshControlLoading : this.refreshControlStable;

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

export default AdsList;

AdsList.propTypes = {
  ads: PropTypes.array.isRequired,
};
