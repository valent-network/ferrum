import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Platform, View, Appearance } from 'react-native';
import { Container, Header, Title } from 'native-base';
import { useTranslation } from 'react-i18next';

import AdsList from 'components/AdsList';

import * as ActionTypes from 'actions/types';

import SegmentTabs from './SegmentTabs';
import Tabs from './Tabs';

import styles from './styles';

const AdsListsScreen = ({ ads, isLoading, navigation, currentTab, setCurrentTab }) => {
  const { t } = useTranslation();

  const onAdOpened = (ad) => {
    navigation.navigate('Ad', { id: ad.id });
  };

  const tabProps = {
    currentTab,
    setCurrentTab,
  };

  return (
    <Container style={styles.mainContainer}>
      <Header
        hasSegment={Platform.OS !== 'android'}
        hastTabs={Platform.OS === 'android'}
        iosBarStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
        noShadow={true}
        style={styles.header}
      >
        <Title style={styles.title}>{t('nav.titles.ads')}</Title>
      </Header>
      <View style={{ marginBottom: 24 }}>
        {Platform.OS === 'android' ? <Tabs {...tabProps} /> : <SegmentTabs {...tabProps} />}
      </View>
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
