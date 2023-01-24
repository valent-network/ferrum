import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import AdsList from 'components/AdsList';
import AdsListHeader from 'components/Starred/AdsListHeader';

import { loadMoreAds, getAll } from 'actions/visitedAds';
import { loadAd } from 'actions/ads';
import { likeAd, unlikeAd } from 'actions/favoriteAds';

import { primaryColor } from 'colors';

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
