import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Body, Title, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';

import { activeColor, secondaryColor, lightColor, superActiveColor } from '../Colors';

function AdsListHeader({ navigate, tab }) {
  const { t } = useTranslation();

  return (
    <Header style={styles.header} noShadow={true} iosBarStyle="light-content">
      <Left style={[styles.tab, (tab == "VisitedAdsScreen" && styles.activeTab)]}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('VisitedAdsScreen')}>
          <Title style={tab == "VisitedAdsScreen" ? styles.activeColor : styles.inactiveColor}>
            <Icon name="eye-outline" style={[styles.icon, tab == "VisitedAdsScreen" ? styles.activeColor : styles.inactiveColor]}/>&nbsp;{t('ads.visited')}
          </Title>
        </TouchableOpacity>
      </Left>
      <Body style={[styles.tab, (tab == "FavoriteAdsScreen" && styles.activeTab)]}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('FavoriteAdsScreen')}>
          <Title style={tab == "FavoriteAdsScreen" ? styles.activeColor : styles.inactiveColor}>
            <Icon name="heart-circle-outline" style={[styles.icon, tab == "FavoriteAdsScreen" ? styles.activeColor : styles.inactiveColor]}/>&nbsp;{t('ads.favorite')}
          </Title>
        </TouchableOpacity>
      </Body>
      <Right style={[styles.tab, (tab == "MyAdsScreen" && styles.activeTab)]}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('MyAdsScreen')}>
          <Title style={tab == "MyAdsScreen" ? styles.activeColor : styles.inactiveColor} >
            <Icon name="file-tray-full-outline" style={[styles.icon, tab == "MyAdsScreen" ? styles.activeColor : styles.inactiveColor]}/>&nbsp;{t('ads.myAds')}
          </Title>
          
        </TouchableOpacity>
      </Right>
    </Header>
  );
}

export default AdsListHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: secondaryColor,
    borderBottomWidth: 0,
  },
  inactiveColor: {
    color: lightColor,
  },
  activeColor: {
    color: activeColor,
  },
  tab: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: superActiveColor,
  },
  icon: {
    fontSize: 16,
  },
});
