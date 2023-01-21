import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import AdsList from '../AdsList';
import AdsListHeader from '../Starred/AdsListHeader';

import { loadMoreAds, getAll } from './visitedAdsActions';
import { loadAd } from '../actions/adsActions';
import { likeAd, unlikeAd } from '../FavoriteAds/favoriteAdsActions';

import { primaryColor } from '../Colors';

class VisitedAdsScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { headerShown: false };
  };

  onAdOpened = (ad) => {
    const { navigation, loadAd } = this.props;
    navigation.navigate('VisitedAdScreen', { id: ad.id });
  };

  render() {
    const { t, ads, loadMoreAds, isLoading, onRefresh, navigation, likeAd, unlikeAd } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <AdsListHeader navigate={navigation.navigate} tab="VisitedAdsScreen" />
        {
          <AdsList
            ads={ads}
            isLoading={isLoading}
            onRefresh={onRefresh}
            loadMoreAds={loadMoreAds}
            likeAd={likeAd}
            unlikeAd={unlikeAd}
            onAdOpened={this.onAdOpened}
          />
        }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.visitedAds.list,
    isLoading: state.visitedAds.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    loadAd: (id) => dispatch(loadAd(id)),
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
    onRefresh: (id, nav) => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitedAdsScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: primaryColor,
  },
});
