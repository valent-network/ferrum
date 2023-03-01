import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Icon, Header, Left, Right, Body } from 'native-base';
import { Platform, Appearance, StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import AdsList from 'components/AdsList';

import { loadMoreAds, getAll, applyHopsCountFilter, applyFilter } from 'actions/feed';
import { likeAd, unlikeAd } from 'actions/favoriteAds';

import FiltersModal from './Filters/FiltersModal';
import SearchBar from 'components/SearchBar';
import MultiPicker from './Filters/MultiPicker';
import MultiPickerItem from './Filters/MultiPickerItem';
import FiltersToggler from './Filters/FiltersToggler';
import HopsFilter from './Filters/HopsFilter';

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
  onQueryReset,
  onQuerySearch,
  query,
  navigation,
}) => {
  const { t } = useTranslation();

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
        noLeft
      >
        <Body style={styles.mainHeaderBody}>
          <SearchBar
            backgroundColor={secondaryColor}
            placeholder={t('feed.search.placeholder')}
            query={query}
            onReset={onQueryReset}
            onSearch={onQuerySearch}
            isLoading={isLoading}
          />
        </Body>
        <Right style={styles.mainHeaderRight}>
          <FiltersToggler />
        </Right>
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
      <FiltersModal />
      <HopsFilter isLoading={isLoading} onPress={applyHopsCountFilter} hopsCount={hopsCount} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    ads: state.feed.ads,
    isLoading: state.feed.isLoading,
    hopsCount: state.filters.hops_count[0],
    query: state.filters.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
    onRefresh: () => dispatch(getAll()),
    applyHopsCountFilter: () => dispatch(applyHopsCountFilter()),
    onQueryReset: () => dispatch(applyFilter('query', ''), []),
    onQuerySearch: (text) => () => dispatch(applyFilter('query', text)),
  };
}

FeedScreen.navigationOptions = ({ navigation }) => {
  return { header: () => null, title: '' };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
