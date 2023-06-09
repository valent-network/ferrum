import React from 'react';
import { Segment, Button, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './styles';

import { secondaryColor, textColor, activeColor, activeTextColor } from 'colors';

export default function SegmentTabs({ currentTab, setCurrentTab }) {
  const { t } = useTranslation();

  return (
    <Segment style={{ backgroundColor: secondaryColor, paddingHorizontal: 8 }}>
      <Button
        style={styles.segmentButton}
        onPress={() => setCurrentTab('visitedAds')}
        active={currentTab == 'visitedAds'}
        first
      >
        <Text style={{ color: currentTab == 'visitedAds' ? activeTextColor : activeColor }}>{t('ads.visited')}</Text>
      </Button>
      <Button
        onPress={() => setCurrentTab('favoriteAds')}
        style={styles.segmentButton}
        active={currentTab == 'favoriteAds'}
      >
        <Text style={{ color: currentTab == 'favoriteAds' ? activeTextColor : activeColor }}>{t('ads.favorite')}</Text>
      </Button>
      <Button onPress={() => setCurrentTab('myAds')} style={styles.segmentButton} active={currentTab == 'myAds'} last>
        <Text style={{ color: currentTab == 'myAds' ? activeTextColor : activeColor }}>{t('ads.myAds')}</Text>
      </Button>
    </Segment>
  );
}
