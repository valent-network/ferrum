import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import CSS from './Styles';

import AdsListItem from './AdsListItem';
import ListNotFound from './ListNotFound';

class AdsList extends React.PureComponent {

  _keyExtractor = item => item.id.toString();

  _onEndReached = async () => {
    this.props.loadMoreAdsDispatched();
  }

  // https://github.com/facebook/react-native/issues/26610
  flatListBugFix = { right: 1 }

  _renderItem = ({ item, index }) => <AdsListItem ad={item} index={index} totalAds={this.props.ads.length} onPress={() => this.props.onAdOpened(item)} />;

  render() {
    const { ads, isLoading, onRefresh } = this.props;
    const refreshControl = <RefreshControl refreshing={isLoading} tintColor={CSS.activeColor} onRefresh={onRefresh} />;

    if (ads.length === 0) {
      return isLoading ? <Spinner color={CSS.activeColor} /> : <ListNotFound refreshControl={refreshControl} />;
    }

    return (
      <FlatList data={ads}
                scrollIndicatorInsets={this.flatListBugFix}
                refreshControl={refreshControl}
                keyExtractor={this._keyExtractor}
                onEndReached={this._onEndReached}
                renderItem={this._renderItem} />
    );
  }
}

export default AdsList;

AdsList.propTypes = {
  ads: PropTypes.array.isRequired,
};
