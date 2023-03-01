import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { Text, Icon } from 'native-base';

import {
  priceColor,
  disabledColor,
  textColor,
  primaryColor,
  secondaryColor,
  activeColor,
  errorColor,
  superActiveColor,
  activeTextColor,
} from 'colors';

import ImageGallery from 'components/Ad/ImageGallery';

import API from 'services/API';

import { AD_IMAGE_HEIGHT } from 'utils';

const updatedAtFormatted = (updatedAtRaw, language) => {
  let updatedAt = dayjs(dayjs().startOf('day')).isBefore(updatedAtRaw)
    ? dayjs(updatedAtRaw).locale(language).format('HH:mm')
    : dayjs(updatedAtRaw).locale(language).format('D MMMM');
  updatedAt =
    dayjs().year() === parseInt(dayjs(updatedAtRaw).format('YYYY'))
      ? updatedAt
      : `${updatedAt} ${dayjs(updatedAtRaw).format('YYYY')}`;

  return updatedAt;
};

const knowsTextFormatted = (friend_name_and_total, t) => {
  let knowsText, handsCountString;

  if (friend_name_and_total) {
    if (friend_name_and_total.friend_hands === 1) {
      knowsText = `${t('ad.postedBy')} ${friend_name_and_total.name}`;
      // friend_name_and_total.count > 0
      //   ? `${t('ads.knows')} ${friend_name_and_total.name} ${t('ads.knowsMore')} ${friend_name_and_total.count}${t(
      //       'ads.knowsMorePostfix',
      //     )}...`
      //   : `${t('ad.postedBy')} ${friend_name_and_total.name}`;
    } else {
      knowsText =
        friend_name_and_total.count > 0
          ? `${t('ads.knows')} ${friend_name_and_total.name} ${t('ads.knowsMore')} ${friend_name_and_total.count}${t(
              'ads.knowsMorePostfix',
            )}...`
          : `${t('ads.knows')} ${friend_name_and_total.name}`;
    }
    handsCountString = '🤝'.repeat(friend_name_and_total.friend_hands);

    return `${handsCountString} ${knowsText}`;
  }
};

export default function AdsListItem({ ad, onPress, likeAd, unlikeAd, openChat }) {
  const { t, i18n } = useTranslation();

  const goToAd = useCallback(() => onPress(ad), [ad]);

  const favAction = useCallback(() => {
    ad.favorite ? unlikeAd(ad) : likeAd(ad);
  }, [ad.favorite, likeAd, unlikeAd]);

  const updatedAt = updatedAtFormatted(ad.updatedAt, i18n.language);
  const knowsText = knowsTextFormatted(ad.friend_name_and_total, t);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imagePreviewContainer}>
        {ad.deleted && (
          <View style={styles.deletedContainer} pointerEvents="none">
            <Text style={styles.deletedText}>{t('ad.deleted')}</Text>
          </View>
        )}
        {!ad.image && (
          <TouchableOpacity activeOpacity={1} onPress={goToAd}>
            <View style={styles.imagePlaceholder}></View>
          </TouchableOpacity>
        )}
        {ad.image && <ImageGallery ad={ad} onPress={goToAd} withModal={false} />}
        <View style={styles.detailsContainer}>
          <TouchableOpacity activeOpacity={1} onPress={goToAd}>
            <View style={styles.detailsRow}>
              <Text style={styles.title}>{ad.title}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.price}>{`${ad.price} ${ad.category_currency}`}</Text>
            </View>
            <Text style={styles.option}>{knowsText}</Text>
            <Text style={styles.option}>{ad.short_description}</Text>

            <View style={styles.actionsContainer}>
              <View style={styles.flexRow}>
                <Icon
                  name={ad.favorite ? 'heart-sharp' : 'heart-outline'}
                  onPress={favAction}
                  style={ad.favorite ? styles.activeFavIcon : styles.favIcon}
                />
                <Icon name="paper-plane" onPress={openChat} style={styles.textColor} />
              </View>
              {ad.region ? (
                <Text style={styles.notes}>{`${ad.region}, ${updatedAt}`}</Text>
              ) : (
                <Text style={styles.notes}>{updatedAt}</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

AdsListItem.propTypes = {};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: textColor,
    fontSize: 24,
  },
  imagePreviewContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  imagePreview: {
    height: '100%',
  },
  detailsContainer: {
    padding: 10,
  },
  flexRow: { flexDirection: 'row' },
  option: {
    marginBottom: 12,
    color: textColor,
    fontSize: 14,
  },
  notes: {
    color: textColor,
    fontSize: 14,
  },
  price: {
    color: priceColor,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  mainContainer: {
    padding: 0,
    paddingRight: 0,
    backgroundColor: primaryColor,
    marginBottom: 24,
  },
  actionsContainer: {
    color: primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deletedContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    height: AD_IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deletedText: { color: activeTextColor, fontSize: 48, textTransform: 'uppercase' },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: '100%',
    height: AD_IMAGE_HEIGHT,
    backgroundColor: disabledColor,
  },
  textColor: { color: textColor },
  activeColor: { color: activeColor },
  favIcon: { marginRight: 16, color: textColor },
  activeFavIcon: { color: superActiveColor, marginRight: 16 },
});
