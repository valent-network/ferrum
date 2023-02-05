import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, ScrollView, Share, SafeAreaView, Appearance } from 'react-native';

import {
  Text,
  Container,
  Content,
  Spinner,
  View,
  Icon,
  H3,
  Header,
  Title,
  Body,
  Left,
  Right,
  ActionSheet,
} from 'native-base';

import { useTranslation } from 'react-i18next';

import { loadAd } from 'actions/ads';

import ImageGallery from './ImageGallery';
import AskFriend from './AskFriend';
import OptionsList from './OptionsList';

import Navigation from 'services/Navigation';

import { styles } from './Styles';
import { activeColor, textColor, spinnerColor, secondaryColor, primaryColor } from 'colors';

import i18n from 'services/i18n';

export default function AdScreen({
  ad,
  currentAdFriends,
  askFriendsIsLoading,
  isLoading,
  actionsLoading,
  onRefresh,
  likeAd,
  unlikeAd,
  deleteAd,
  archiveAd,
  unarchiveAd,
}) {
  const { t } = useTranslation();
  const refreshControl = <RefreshControl tintColor={spinnerColor} refreshing={isLoading} onRefresh={onRefresh} />;
  const colorStyle = [styles.icon, ad.favorite ? styles.activeColor : styles.mainColor];

  const shareAction = () =>
    Share.share({
      message: `${i18n.t('ad.shareText')} https://recar.io/ads/${ad.id}`,
      title: ad.title,
    });
  const favAction = () => (ad.favorite ? unlikeAd(ad) : likeAd(ad));
  const unarchiveAdAction = () => unarchiveAd(ad.id);
  const editAd = () => Navigation.navigate('EditAdScreen', { ad: ad });
  const deleteAdAction = () =>
    ActionSheet.show(
      {
        title: t('ad.alerts.confirm_delete'),
        options: [t('actions.delete'), t('actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return deleteAd(ad.id);
        }
      },
    );
  const archiveAdAction = () =>
    ActionSheet.show(
      {
        title: t('ad.alerts.confirm_archive'),
        options: [t('actions.archive'), t('actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return archiveAd(ad.id);
        }
      },
    );

  if (isLoading && typeof ad.id === 'undefined') {
    return (
      <Container style={{ backgroundColor: primaryColor }}>
        <Content>
          <Spinner color={spinnerColor} />
        </Content>
      </Container>
    );
  }

  return (
    <Container style={{ backgroundColor: primaryColor }}>
      <View style={styles.headerBackground}>
        <Header
          noShadow={true}
          iosBarStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
          style={styles.header}
        >
          <Left>
            <Icon
              name={Platform.OS === 'android' ? 'arrow-back-circle-sharp' : 'chevron-back-circle-sharp'}
              style={[styles.icon, { color: secondaryColor }]}
              onPress={Navigation.popToTop}
            />
          </Left>
          <Right style={styles.actionButtonsContainer}>
            <Icon style={[styles.icon, { color: secondaryColor }]} onPress={shareAction} name="share-outline" />
            <Icon
              onPress={favAction}
              style={colorStyle}
              name={ad.favorite ? 'heart-circle-sharp' : 'heart-circle-outline'}
            />
          </Right>
        </Header>
      </View>
      <ScrollView refreshControl={refreshControl} showsVerticalScrollIndicator={false}>
        <ImageGallery
          ad={ad}
          imageStyle={{ height: 350, opacity: 0.75 }}
          badgeStyle={{ right: 8, top: 312, position: 'absolute' }}
          withModal={true}
        />
        {ad.images.length === 0 && <View style={styles.imagePlaceholder}></View>}
        <View style={styles.contentContainer}>
          {ad.my_ad && actionsLoading && <Spinner color={spinnerColor} />}

          {ad.my_ad && !actionsLoading && (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.actions}>
              {!ad.deleted && (
                <Text style={styles.actionText} onPress={archiveAdAction}>
                  <Icon style={styles.actionIcon} name="eye-off-outline" /> {t('actions.archive')}
                </Text>
              )}
              {ad.deleted && (
                <Text style={styles.actionText} onPress={unarchiveAdAction}>
                  <Icon style={styles.actionIcon} name="eye-outline" /> {t('actions.unarchive')}
                </Text>
              )}
              <Text style={styles.actionText} onPress={deleteAdAction}>
                <Icon style={styles.actionIcon} name="trash-outline" /> {t('actions.delete')}
              </Text>
              <Text style={styles.actionText} onPress={editAdAction}>
                <Icon style={styles.actionIcon} name="create-outline" /> {t('actions.edit')}
              </Text>
            </ScrollView>
          )}

          <Text style={styles.title}>{ad.title}</Text>
          <Text style={styles.price}>
            {ad.price} {ad.category_currency}
          </Text>

          <View style={styles.oldPricesContainer}>
            {ad.prices.map((v, index) => (
              <Text key={v[1]} style={styles.priceVersion}>
                {v[1]} ${ad.prices.length === index + 1 ? null : ', '}
              </Text>
            ))}
          </View>

          {!ad.my_ad &&
            (askFriendsIsLoading ? (
              <Spinner color={spinnerColor} />
            ) : (
              <AskFriend ad={ad} currentAdFriends={currentAdFriends} />
            ))}

          {ad.deleted && (
            <View style={styles.deletedContainer}>
              <Text style={styles.deleted}>{t('ad.deleted')}</Text>
            </View>
          )}

          {Object.keys(ad.options).length > 0 && <OptionsList ad={ad} />}

          <View style={styles.descriptionContainer}>
            <Text selectable style={styles.descriptionText}>
              {ad.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

AdScreen.propTypes = {
  ad: PropTypes.object.isRequired,
};
