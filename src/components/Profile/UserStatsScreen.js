import React, { useState } from 'react';
import { Text, Content, List, ListItem, Radio, Left, Right, Container, View, Title, Subtitle } from 'native-base';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { primaryColor, textColor, secondaryColor, activeColor } from 'colors';
import { getCachedLocale, setCachedLocale } from 'services/AsyncStorage';
import i18n from 'services/i18n';
import API from 'services/API';

function UserStatsScreen({ navigation }) {
  const { t } = useTranslation();
  const { stats } = navigation.state.params;

  return (
    <Container style={{ backgroundColor: primaryColor }}>
      <Content contentContainerStyle={{ padding: 16 }}>
        {!!stats.top_regions[0] && (
          <View style={styles.statContainer}>
            <Text style={styles.statHeader}>{t('stats.top_regions')}</Text>
            <View style={styles.statValue}>
              <Text style={styles.text}>{stats.top_regions[0]}</Text>
            </View>
            <Text style={styles.statDescription}>{t('statsDescriptions.top_regions')}</Text>
          </View>
        )}

        {parseInt(stats.potential_reach) > 0 && (
          <View style={styles.statContainer}>
            <Text style={styles.statHeader}>{t('stats.potential_reach')}</Text>
            <View style={styles.statValue}>
              <Text style={styles.text}>{stats.potential_reach}</Text>
            </View>
            <Text style={styles.statDescription}>{t('statsDescriptions.potential_reach')}</Text>
          </View>
        )}

        {stats.activity_percentage != null && typeof stats.activity_percentage !== 'undefined' && (
          <View style={styles.statContainer}>
            <View style={styles.statValue}>
              <Text style={styles.text}>
                {t('top')}-{stats.activity_percentage}% {t('stats.activity_percentage')}
              </Text>
            </View>
            <Text style={styles.statDescription}>{t('statsDescriptions.activity_percentage')}</Text>
          </View>
        )}

        {stats.popularity_percentage != null && typeof stats.popularity_percentage !== 'undefined' && (
          <View style={styles.statContainer}>
            <View style={styles.statValue}>
              <Text style={styles.text}>
                {t('top')}-{stats.popularity_percentage}% {t('stats.popularity_percentage')}
              </Text>
            </View>
            <Text style={styles.statDescription}>{t('statsDescriptions.popularity_percentage')}</Text>
          </View>
        )}

        {stats.adoption_percentage != null && typeof stats.adoption_percentage !== 'undefined' && (
          <View style={styles.statContainer}>
            <View style={styles.statValue}>
              <Text style={styles.text}>
                {t('top')}-{stats.adoption_percentage}% {t('stats.adoption_percentage')}
              </Text>
            </View>
            <Text style={styles.statDescription}>{t('statsDescriptions.adoption_percentage')}</Text>
          </View>
        )}
      </Content>
    </Container>
  );
}

UserStatsScreen.navigationOptions = ({ navigation }) => {
  const { stats } = navigation.state.params;
  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      borderWidth: 0,
      borderBottomColor: primaryColor,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTitle: () => (
      <>
        <Title style={{ color: textColor }}>{i18n.t('nav.titles.userStats')}</Title>
        <Subtitle style={{ color: textColor }}>
          {dayjs(stats.updated_at).locale(i18n.language).format('D MMMM')}
        </Subtitle>
      </>
    ),
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: textColor,
  };
};

export default UserStatsScreen;

const styles = StyleSheet.create({
  statDescription: { color: textColor, paddingLeft: 16, paddingTop: 8 },
  text: { color: textColor, fontWeight: 'bold' },
  statContainer: { marginBottom: 24 },
  statHeader: { fontWeight: 'bold', color: textColor, marginBottom: 8, fontSize: 18 },
  statValue: { backgroundColor: secondaryColor, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
});
