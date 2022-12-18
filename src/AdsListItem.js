import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';

import { Text } from 'native-base';

import { priceColor, disabledColor, lightColor, primaryColor, secondaryColor, activeColor } from './Colors';

class AdsListItem extends React.PureComponent {
  onPress = () => this.props.onPress(this.props.ad);

  render() {
    const { title, image, price, short_description, friend_name_and_total } = this.props.ad;

    const { t, ad } = this.props;

    const imageURI = { uri: image };

    let knowsText, handsCountString;

    if (friend_name_and_total) {
      if (friend_name_and_total.friend_hands === 1) {
        knowsText =
          friend_name_and_total.count > 0
            ? `${t('ads.knows')} ${friend_name_and_total.name} ${t('ads.knowsMore')} ${friend_name_and_total.count}${t('ads.knowsMorePostfix')}...`
            : `${t('ad.postedBy')} ${friend_name_and_total.name}`;
      } else {
        knowsText =
          friend_name_and_total.count > 0
            ? `${t('ads.knows')} ${friend_name_and_total.name} ${t('ads.knowsMore')} ${friend_name_and_total.count}${t('ads.knowsMorePostfix')}...`
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
                <Text style={styles.title}>{title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.price}>{price} $</Text>
                  <Text style={styles.option}>{ad.region}</Text>
                </View>
                <Text style={styles.option}>{short_description}</Text>

                <Text style={styles.option}>{knowsText}</Text>
              </View>
              <Image style={styles.imagePreview} source={imageURI} />
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
});
