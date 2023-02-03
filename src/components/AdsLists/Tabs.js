import React from 'react';
import { Tabs as NBTabs, Tab, Button, Text, View, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './styles';

import { secondaryColor, simpleColor, activeColor } from 'colors';

export default function Tabs({ currentTab, setCurrentTab }) {
  const { t } = useTranslation();

  return (
    <View style={{ flexDirection: 'row' }}>
      <Button
        style={currentTab == 'visitedAds' ? styles.activeTabButton : styles.tabButton}
        onPress={() => setCurrentTab('visitedAds')}
        active={currentTab == 'visitedAds'}
        first
      >
        <Icon style={{ color: currentTab === 'visitedAds' ? activeColor : simpleColor }} name="eye-outline" />
      </Button>
      <Button
        onPress={() => setCurrentTab('favoriteAds')}
        style={currentTab == 'favoriteAds' ? styles.activeTabButton : styles.tabButton}
        active={currentTab == 'favoriteAds'}
      >
        <Icon style={{ color: currentTab === 'favoriteAds' ? activeColor : simpleColor }} name="heart-circle-outline" />
      </Button>
      <Button
        onPress={() => setCurrentTab('myAds')}
        style={currentTab == 'myAds' ? styles.activeTabButton : styles.tabButton}
        active={currentTab == 'myAds'}
        last
      >
        <Icon style={{ color: currentTab === 'myAds' ? activeColor : simpleColor }} name="cart-outline" />
      </Button>
    </View>
  );
}
