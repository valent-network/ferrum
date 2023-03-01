import React from 'react';
import { Tabs as NBTabs, Tab, Button, Text, View, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

import { secondaryColor, textColor, activeColor } from 'colors';

export default function Tabs({ currentTab, setCurrentTab }) {
  const { t } = useTranslation();

  return (
    <View style={{ flexDirection: 'row', borderWidth: 0 }}>
      <TouchableOpacity
        activeOpacit={1}
        style={currentTab == 'visitedAds' ? styles.activeTabButton : styles.tabButton}
        onPress={() => setCurrentTab('visitedAds')}
        active={currentTab == 'visitedAds'}
        first
      >
        <Icon
          style={{ paddingBottom: 16, color: currentTab === 'visitedAds' ? activeColor : textColor }}
          name="eye-outline"
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacit={1}
        onPress={() => setCurrentTab('favoriteAds')}
        style={currentTab == 'favoriteAds' ? styles.activeTabButton : styles.tabButton}
        active={currentTab == 'favoriteAds'}
      >
        <Icon
          style={{ paddingBottom: 16, color: currentTab === 'favoriteAds' ? activeColor : textColor }}
          name="heart-outline"
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacit={1}
        onPress={() => setCurrentTab('myAds')}
        style={currentTab == 'myAds' ? styles.activeTabButton : styles.tabButton}
        active={currentTab == 'myAds'}
        last
      >
        <Icon
          style={{ paddingBottom: 16, color: currentTab === 'myAds' ? activeColor : textColor }}
          name="megaphone-outline"
        />
      </TouchableOpacity>
    </View>
  );
}
