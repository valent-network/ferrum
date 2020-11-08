import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Badge, Icon, View } from 'native-base';
import { TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-snap-carousel';

import { styles } from './Styles';

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imagesFullscreenOpened: false };
  }

  changeImagesFullscreenOpened = () => {
    this.setState({
      imagesFullscreenOpened: !this.state.imagesFullscreenOpened,
    });
  };

  imageMapper = (image) => ({ url: image });
  windowWidth = Dimensions.get('window').width;

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.changeImagesFullscreenOpened}>
        <Image style={styles.image} source={{ uri: item }} onPress={this.changeImagesFullscreenOpened} />
      </TouchableOpacity>
    );
  };

  render() {
    const { images } = this.props.ad;

    return (
      <React.Fragment>
        <Carousel
          data={images}
          renderItem={this._renderItem}
          itemWidth={this.windowWidth}
          sliderWidth={this.windowWidth}
        />

        <View style={styles.imageGalleryBadgesContainer}>
          <Badge style={styles.imageGalleryBadge}>
            <Icon name="images-outline" style={styles.imageGalleryBadgeIcon} />
            <Text style={styles.ImageGalleryBadgeText}> {images.length}</Text>
          </Badge>
        </View>

        <Modal visible={this.state.imagesFullscreenOpened} transparent={false}>
          <ImageViewer
            enableSwipeDown={true}
            enablePreload={true}
            saveToLocalByLongPress={false}
            maxOverflow={0}
            onCancel={this.changeImagesFullscreenOpened}
            imageUrls={images.map(this.imageMapper)}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

ImageGallery.propTypes = {
  ad: PropTypes.object.isRequired,
};
