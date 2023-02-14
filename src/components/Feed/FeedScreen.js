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

import styles from './Filters/Styles';

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
      >
        <Funnel />
        <SearchBar />
        <TouchableOpacity activeOpacity={1} onPress={applyHopsCountFilter}>
          <View
            key={'hopsCountF'}
            style={[hopsCount >= 0 ? styles.activeFilterBox : styles.filterBox, { marginRight: 0 }]}
          >
            <Text
              style={[
                { opacity: 0.5 },
                styles.filterBoxText,
                { fontSize: Platform.OS === 'android' ? 18 : 12 },
                hopsCount >= 0 && { opacity: 1 },
              ]}
            >
              🤝
            </Text>
            <Text
              style={[
                { opacity: 0.5 },
                styles.filterBoxText,
                { fontSize: Platform.OS === 'android' ? 18 : 12 },
                hopsCount >= 1 && { opacity: 1 },
              ]}
            >
              🤝
            </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
