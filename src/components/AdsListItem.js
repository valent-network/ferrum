import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';

import { Text, Icon } from 'native-base';

import {
  priceColor,
  disabledColor,
  lightColor,
  primaryColor,
  secondaryColor,
  activeColor,
  errorColor,
  notesColor,
} from 'colors';

import API from 'services/API';

class AdsListItem extends React.PureComponent {
  onPress = () => this.props.onPress(this.props.ad);

  favAction = () => {
    const { ad, likeAd, unlikeAd } = this.props;

    ad.favorite ? unlikeAd(ad) : likeAd(ad);
  };

  render() {
    const { title, image, price, short_description, friend_name_and_total, category_currency } = this.props.ad;

    const { t, ad } = this.props;

    let knowsText, handsCountString;

    if (friend_name_and_total) {
      if (friend_name_and_total.friend_hands === 1) {
        knowsText =
          friend_name_and_total.count > 0
            ? `${t('ads.knows')} ${friend_name_and_total.name} ${t('ads.knowsMore')} ${friend_name_and_total.count}${t(
                'ads.knowsMorePostfix',
              )}...`
            : `${t('ad.postedBy')} ${friend_name_and_total.name}`;
      } else {
        knowsText =
          friend_name_and_total.count > 0
            ? `${t('ads.knows')} ${friend_name_and_total.name} ${t('ads.knowsMore')} ${friend_name_and_total.count}${t(
                'ads.knowsMorePostfix',
              )}...`
            : `${t('ads.knows')} ${friend_name_and_total.name}`;
      }
      handsCountString = '🤝'.repeat(friend_name_and_total.friend_hands);
      knowsText = `${handsCountString} ${knowsText}`;
    }

    return (
      <React.Fragment>
        <TouchableOpacity activeOpacity={1} onPress={this.onPress}>
          <View style={styles.mainContainer}>
            <View style={styles.imagePreviewContainer}>
              <View style={styles.detailsContainer}>
                <View style={styles.detailsRow}>
                  <Text style={styles.title}>{title}</Text>
                  {ad.deleted && (
                    <View style={styles.deletedContainer}>
                      <Text style={styles.deletedText}>{t('ad.deleted')}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.detailsRow}>
                  <Text style={styles.price}>
                    {price} {category_currency}
                  </Text>
                  <Text style={styles.option}>{ad.region}</Text>
                </View>
                <Text style={styles.option}>{short_description}</Text>

                <Text style={styles.option}>{knowsText}</Text>
                <View style={styles.actionsContainer}>
                  <Icon
                    name={ad.favorite ? 'heart-circle-sharp' : 'heart-circle-outline'}
                    onPress={this.favAction}
                    style={[{}, ad.favorite ? { color: activeColor } : { color: lightColor }]}
                  />
                </View>
              </View>
              {image && <Image style={styles.imagePreview} source={{ uri: image.url }} />}
              {!image && <View style={styles.imagePlaceholder}></View>}
            </View>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}

export default withTranslation()(AdsListItem);

AdsListItem.propTypes = {};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: lightColor,
    fontSize: 24,
  },
  imagePreviewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  imagePreview: {
    height: '100%',
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: '100%',
    justifyContent: 'flex-end',
    bottom: 0,

    position: 'absolute',
    zIndex: 100000,
  },
  option: {
    marginBottom: 12,
    color: disabledColor,
    fontSize: 14,
  },
  price: {
    color: priceColor,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  mainContainer: {
    height: 500,
    marginBottom: 24,
    padding: 0,
    paddingRight: 0,
    backgroundColor: primaryColor,
  },
  actionsContainer: {
    backgroundColor: 'transparent',
    color: primaryColor,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  deletedContainer: {
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    marginRight: 0,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deletedText: {
    color: errorColor,
    fontSize: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: notesColor,
  },
});
