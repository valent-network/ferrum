import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Icon, Header } from 'native-base';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';

import AdsList from 'components/AdsList';

import { loadMoreAds, getAll } from 'actions/feed';
import { likeAd, unlikeAd } from 'actions/favoriteAds';

import FiltersModal from './Filters/FiltersModal';
import SearchBar from './Filters/SearchBar';
import MultiPicker from './Filters/MultiPicker';
import Funnel from './Filters/Funnel';

import PermissionsBox from './PermissionsBox';

import { secondaryColor, activeColor } from 'colors';

const FeedScreen = ({ ads, loadMoreAds, hopsOpt, isLoading, onRefresh, likeAd, unlikeAd, navigation }) => {
  const onAdOpened = (ad) => {
    navigation.push('Ad', { id: ad.id });
  };
  return (
    <Container>
      <Header style={styles.mainHeader} iosBarStyle="light-content" noShadow={true} searchBar rounded>
        <SearchBar />
      </Header>
      <View style={styles.filtersRow}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Funnel />
          <MultiPicker opt={hopsOpt} />
        </ScrollView>
      </View>
      <PermissionsBox />
      <AdsList
        ads={ads}
        isLoading={isLoading}
        onRefresh={onRefresh}
        loadMoreAds={loadMoreAds}
        likeAd={likeAd}
        unlikeAd={unlikeAd}
        onAdOpened={onAdOpened}
        fromFeed={true}
      />
      <FiltersModal />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    ads: state.feed.ads,
    isLoading: state.feed.isLoading,
    hopsOpt: { name: 'hops_count', values: state.settings.filtersValues.hops_count },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
    onRefresh: () => dispatch(getAll()),
  };
}

FeedScreen.navigationOptions = ({ navigation }) => {
  return { header: () => null, title: '' };
};

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: secondaryColor,
    flexWrap: 'nowrap',
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  filtersRow: {
    paddingVertical: 12,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
