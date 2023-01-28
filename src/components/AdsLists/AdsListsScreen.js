import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Header, Segment, Body, Button, Text, Title } from 'native-base';
import { useTranslation } from 'react-i18next';

import AdsList from 'components/AdsList';

import { primaryColor, secondaryColor, activeColor, lightColor } from 'colors';

import * as ActionTypes from 'actions/types';

const AdsListsScreen = ({ ads, isLoading, navigation, currentTab, setCurrentTab }) => {
  const { t } = useTranslation();

  const onAdOpened = (ad) => {
    navigation.navigate('Ad', { id: ad.id });
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
          onPress={() => setCurrentTab('visitedAds')}
          active={currentTab == 'visitedAds'}
          first
        >
          <Text style={{ color: currentTab == 'visitedAds' ? lightColor : activeColor }}>{t('ads.visited')}</Text>
        </Button>
        <Button
          onPress={() => setCurrentTab('favoriteAds')}
          style={{ borderColor: activeColor, width: '33.33333%', justifyContent: 'center' }}
          active={currentTab == 'favoriteAds'}
        >
          <Text style={{ color: currentTab == 'favoriteAds' ? lightColor : activeColor }}>{t('ads.favorite')}</Text>
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
      {<AdsList onAdOpened={onAdOpened} ads={ads} isLoading={isLoading} />}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    currentTab: state.settings.currentTabAdsLists,
    ads: state[state.settings.currentTabAdsLists].list,
    isLoading: state[state.settings.currentTabAdsLists].isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentTab: (tabName) => dispatch({ type: ActionTypes.SET_CURRENT_TAB_ADS_LISTS, tabName: tabName }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsListsScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: primaryColor,
  },
});
