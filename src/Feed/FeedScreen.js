import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { SafeAreaView } from 'react-native';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './feedActions';
import { loadAd } from '../actions/adsActions';

import FeedFilters from './FeedFilters';
import PermissionsBox from './PermissionsBox';

class FeedScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return({ header: () => null, title: 'Лента' });
  }

  onAdOpened = (ad) => {
    const { navigation, loadAdDispatched } = this.props;
    navigation.push('Ad', { id: ad.id });
  }

  render() {
    const { ads, loadMoreAdsDispatched, filters, isLoading, onRefreshDispatched } = this.props;
    const filtersPresent = Object.values(filters).filter(f => f.length > 0).length > 0;

    return (
      <Container>
        <FeedFilters />
        <PermissionsBox />
        <AdsList ads={ads}
                 isLoading={isLoading}
                 onRefresh={onRefreshDispatched}
                 loadMoreAdsDispatched={loadMoreAdsDispatched}
                 onAdOpened={this.onAdOpened}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.feed.ads,
    isLoading: state.feed.isLoading,
    filters: state.filters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAdsDispatched: () => dispatch(loadMoreAds()),
    loadAdDispatched: (id) => dispatch(loadAd(id)),
    onRefreshDispatched: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
