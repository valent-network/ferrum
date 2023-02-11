import React, { useCallback } from 'react';
import { Platform, Appearance } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Icon, Header } from 'native-base';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';

import AdsList from 'components/AdsList';

import { loadMoreAds, getAll, applyHopsCountFilter } from 'actions/feed';
import { likeAd, unlikeAd } from 'actions/favoriteAds';

import FiltersModal from './Filters/FiltersModal';
import SearchBar from './Filters/SearchBar';
import MultiPicker from './Filters/MultiPicker';
import MultiPickerItem from './Filters/MultiPickerItem';
import Funnel from './Filters/Funnel';

import PermissionsBox from './PermissionsBox';
import ContactsUploading from './ContactsUploading';

import { secondaryColor, activeColor, primaryColor, textColor, activeBorderColor } from 'colors';

const FeedScreen = ({
  ads,
  loadMoreAds,
  isLoading,
  onRefresh,
  likeAd,
  unlikeAd,
  hopsCount,
  applyHopsCountFilter,
  navigation,
}) => {
  const onAdOpened = useCallback(
    (ad) => {
      navigation.push('FeedAd', { id: ad.id });
    },
    [navigation],
  );

  return (
    <Container style={styles.mainContainer}>
      <Header
        style={styles.mainHeader}
        iosBarStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
        noShadow={true}
        searchBar
        rounded
      >
        <Funnel />
        <SearchBar />
        <TouchableOpacity activeOpacity={1} onPress={applyHopsCountFilter}>
          <View key={'hopsCountF'} style={hopsCount >= 0 ? styles.activeFilterBox : styles.filterBox}>
            <Text style={[styles.filterBoxText, hopsCount >= 0 && { opacity: 1 }]}>🤝</Text>
            <Text style={[styles.filterBoxText, hopsCount >= 1 && { opacity: 1 }]}>🤝</Text>
          </View>
        </TouchableOpacity>
      </Header>
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
    hopsCount: state.filters.hops_count[0],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
    onRefresh: () => dispatch(getAll()),
    applyHopsCountFilter: () => dispatch(applyHopsCountFilter()),
  };
}

FeedScreen.navigationOptions = ({ navigation }) => {
  return { header: () => null, title: '' };
};

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: primaryColor },
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
  activeFilterBox: {
    borderColor: activeBorderColor,
    borderWidth: 1,
    borderRadius: 32,
    marginRight: 12,
    padding: 6,
    flexDirection: 'row',
    backgroundColor: activeColor,
  },
  filterBox: {
    borderColor: activeColor,
    borderWidth: 1,
    borderRadius: 32,
    marginRight: 12,
    padding: 6,
    flexDirection: 'row',
    backgroundColor: secondaryColor,
  },
  filterBoxText: {
    color: textColor,
    fontSize: 12,
    opacity: 0.5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
