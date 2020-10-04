import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';

import { Text } from 'native-base';

import { adCar as styles } from './Styles';

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
