import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import AdsList from 'components/AdsList';
import AdsListHeader from 'components/Starred/AdsListHeader';

import { loadMoreAds, getAll } from 'actions/myAds';
import { likeAd, unlikeAd } from 'actions/favoriteAds';
// import { loadAd } from 'actions/ads';

import { primaryColor, lightColor, secondaryColor } from 'colors';

class MyAdsScreen extends React.PureComponent {
  onAdOpened = (ad) => this.props.navigation.push('MyAdScreen', { id: ad.id });

  render() {
    const { ads, loadMoreAds, isLoading, onRefresh, navigation, likeAd, unlikeAd } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <AdsListHeader navigate={navigation.navigate} tab="MyAdsScreen" />
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
