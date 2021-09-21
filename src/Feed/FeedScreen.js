import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'native-base';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './feedActions';
import { loadAd } from '../actions/adsActions';
import * as ActionTypes from '../actions/actionTypes';

import FeedFilters from './FeedFilters';
import PermissionsBox from './PermissionsBox';

class FeedScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { header: () => null, title: 'Лента' };
  };

  onAdOpened = (ad) => {
    const { navigation, loadAd } = this.props;
    navigation.push('Ad', { id: ad.id });
  };

  render() {
    const { ads, loadMoreAds, filters, isLoading, onRefresh } = this.props;

    return (
      <Container>
        <FeedFilters />
        <PermissionsBox />
        <AdsList
          ads={ads}
          isLoading={isLoading}
          onRefresh={onRefresh}
          loadMoreAds={loadMoreAds}
          onAdOpened={this.onAdOpened}
          fromFeed={true}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.feed.ads,
    isLoading: state.feed.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    loadAd: (id) => dispatch(loadAd(id)),
    onRefresh: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
