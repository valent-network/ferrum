import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

import { Text } from 'native-base';

export default class AdsListItem extends React.PureComponent {
  render() {
    const { title, image, price, short_description, friend_name_and_total } = this.props.ad;

    const { ad, onPress } = this.props;

    const imageURI = { uri: image };

    let knowsText;

    if (friend_name_and_total) {
      if (friend_name_and_total.friend_hands === 1) {
        knowsText =
          friend_name_and_total.count > 0 ? `Разместил ${friend_name_and_total.name}, знают еще ${friend_name_and_total.count}...` : `Разместил ${friend_name_and_total.name}`;
      } else {
        knowsText = friend_name_and_total.count > 0 ? `Знает ${friend_name_and_total.name} и еще ${friend_name_and_total.count}...` : `Знает ${friend_name_and_total.name}`;
      }
    }

    return (
      <React.Fragment>
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <View style={styles.mainContainer}>
            <View style={styles.imagePreviewContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price} $</Text>
                <Text style={styles.option}>
                  {short_description}
                </Text>

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

AdsListItem.propTypes = {};

const styles = StyleSheet.create({
  title: {
    marginBottom: 2,
    color: '#fff',
    fontSize: 24,
  },
  imagePreviewContainer: {
    flex: 1,
  },
  imagePreview: {
    height: '100%',
    borderRadius: 12,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: '100%',
    justifyContent: 'flex-end',
    bottom: 0,
    borderRadius: 12,
    position: 'absolute',
    'zIndex': 100000
  },
  option: {
    marginBottom: 12,
    color: '#aaa',
    fontSize: 14,
  },
  price: {
    color: '#85bb65',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12
  },
  mainContainer: {
    height: 500,
    marginTop: 6,
    padding: 16,
    backgroundColor: 'transparent'
  }
});
