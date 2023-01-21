import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import AdsList from '../AdsList';
import AdsListHeader from '../Starred/AdsListHeader';

import { loadMoreAds, getAll } from './myAdsActions';
import { likeAd, unlikeAd } from '../FavoriteAds/favoriteAdsActions';
// import { loadAd } from '../actions/adsActions';

import { primaryColor, lightColor, secondaryColor } from '../Colors';

class MyAdsScreen extends React.PureComponent {
  onAdOpened = (ad) => this.props.navigation.push('MyAdScreen', { id: ad.id })

  render() {
    const { ads, loadMoreAds, isLoading, onRefresh, navigation, likeAd, unlikeAd } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <AdsListHeader navigate={navigation.navigate} tab='MyAdsScreen' />
        <AdsList
          ads={ads}
          isLoading={isLoading}
          onRefresh={onRefresh}
          loadMoreAds={loadMoreAds}
          likeAd={likeAd}
          unlikeAd={unlikeAd}
          onAdOpened={this.onAdOpened}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.myAds.list,
    isLoading: state.myAds.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    onRefresh: () => dispatch(getAll()),
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAdsScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: primaryColor,
  },
});
