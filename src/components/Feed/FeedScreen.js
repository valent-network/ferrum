import React from 'react';
import { Platform, Appearance } from 'react-native';
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
import ContactsUploading from './ContactsUploading';

import { secondaryColor, activeColor, primaryColor } from 'colors';

const FeedScreen = ({ ads, loadMoreAds, hopsOptions, isLoading, onRefresh, likeAd, unlikeAd, navigation }) => {
  const onAdOpened = (ad) => {
    navigation.push('FeedAd', { id: ad.id });
  };

  return (
    <Container style={{ backgroundColor: primaryColor }}>
      <Header
        style={styles.mainHeader}
        iosBarStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
        noShadow={true}
        searchBar
        rounded
      >
        <Funnel />
        <SearchBar />
      </Header>
      <View style={styles.filtersRow}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <MultiPicker opt={hopsOptions} />
        </ScrollView>
      </View>
      <ContactsUploading />

      <AdsList
        ads={ads}
        isLoading={isLoading}
        onRefreshFeed={onRefresh}
        loadMoreFeedAds={loadMoreAds}
        likeAd={likeAd}
        unlikeAd={unlikeAd}
        onAdOpened={onAdOpened}
        fromFeed={true}
      />
      <PermissionsBox />
      <FiltersModal />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    ads: state.feed.ads,
    isLoading: state.feed.isLoading,
    hopsOptions: { name: 'hops_count', values: state.settings.hopsOptions },
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
    backgroundColor: primaryColor,
    flexWrap: 'nowrap',
    borderBottomWidth: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 8 : 0,
  },
  filtersRow: {
    padding: 8,
    paddingTop: 0,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
