import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Header, Segment, Body, Button, Text, Title } from 'native-base';
import { useTranslation } from 'react-i18next';

import AdsList from 'components/AdsList';

import { loadMoreAds as loadMoreAdsFavorite, getAll as getAllFavorite } from 'actions/favoriteAds';
import { loadMoreAds as loadMoreAdsMyAds, getAll as getAllMyAds } from 'actions/myAds';
import { loadMoreAds as loadMoreAdsVisited, getAll as getAllVisited } from 'actions/visitedAds';

import { likeAd, unlikeAd } from 'actions/favoriteAds';

import { primaryColor, secondaryColor, activeColor, lightColor } from 'colors';

const AdsListsScreen = ({ ads, loadMoreAds, isLoading, onRefresh, navigation, likeAd, unlikeAd }) => {
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = useState('favorite');

  const onAdOpened = (ad) => {
    navigation.navigate('Ad', { id: ad.id });
  };

  const defaultAdsListProps = {
    likeAd: likeAd,
    unlikeAd: unlikeAd,
    onAdOpened: onAdOpened,
  };

  const adsListProps = {
    ...defaultAdsListProps,
    ads: ads[currentTab],
    isLoading: isLoading[currentTab],
    onRefresh: onRefresh[currentTab],
    loadMoreAds: loadMoreAds[currentTab],
  };

  return (
    <Container style={styles.mainContainer}>
      <Header
        hasSegment
        iosBarStyle="light-content"
        noShadow={true}
        style={{ backgroundColor: secondaryColor, flexDirection: 'column' }}
      >
        <Title style={{ color: lightColor }}>{t('nav.titles.ads')}</Title>
      </Header>
      <Segment style={{ backgroundColor: secondaryColor, paddingHorizontal: 8 }}>
        <Button
          style={{ borderColor: activeColor, width: '33.33333%', justifyContent: 'center' }}
          onPress={() => setCurrentTab('visited')}
          active={currentTab == 'visited'}
          first
        >
          <Text style={{ color: currentTab == 'visited' ? lightColor : activeColor }}>{t('ads.visited')}</Text>
        </Button>
        <Button
          onPress={() => setCurrentTab('favorite')}
          style={{ borderColor: activeColor, width: '33.33333%', justifyContent: 'center' }}
          active={currentTab == 'favorite'}
        >
          <Text style={{ color: currentTab == 'favorite' ? lightColor : activeColor }}>{t('ads.favorite')}</Text>
        </Button>
        <Button
          onPress={() => setCurrentTab('myAds')}
          style={{ borderColor: activeColor, width: '33.33333%', justifyContent: 'center' }}
          active={currentTab == 'myAds'}
          last
        >
          <Text style={{ color: currentTab == 'myAds' ? lightColor : activeColor }}>{t('ads.myAds')}</Text>
        </Button>
      </Segment>
      {<AdsList {...adsListProps} />}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    ads: {
      visited: state.visitedAds.list,
      myAds: state.myAds.list,
      favorite: state.favoriteAds.list,
    },
    isLoading: {
      visited: state.visitedAds.isLoading,
      myAds: state.myAds.isLoading,
      favorite: state.favoriteAds.isLoading,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: {
      visited: () => dispatch(loadMoreAdsVisited()),
      myAds: () => dispatch(loadMoreAdsMyAds()),
      favorite: () => dispatch(loadMoreAdsFavorite()),
    },
    onRefresh: {
      visited: () => dispatch(getAllVisited()),
      myAds: () => dispatch(getAllMyAds()),
      favorite: () => dispatch(getAllFavorite()),
    },
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsListsScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: primaryColor,
  },
});
