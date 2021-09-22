import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import { activeColor, secondaryColor } from './Colors';

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
  refreshControlLoading = (<RefreshControl refreshing={true} tintColor={secondaryColor} onRefresh={this.onRefresh} />);
  refreshControlStable = (<RefreshControl refreshing={false} tintColor={secondaryColor} onRefresh={this.onRefresh} />);

  _renderItem = ({ item, index }) => (
    <AdsListItem ad={item} index={index} totalAds={this.props.ads.length} onPress={this.props.onAdOpened} />
  );

  render() {
    const { ads, isLoading, fromFeed } = this.props;
    const refreshControl = isLoading ? this.refreshControlLoading : this.refreshControlStable;

    if (ads.length === 0) {
      return isLoading ? (
        <Spinner color={activeColor} />
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
