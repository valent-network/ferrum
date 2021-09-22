import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Badge, Icon, View } from 'native-base';
import { TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-snap-carousel';

import { styles } from './Styles';

import { appearanceBgColor } from '../Colors'

const ImageViewerPageAnimationTimeoutMs = 300;

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imagesFullscreenOpened: false, currentImageIndex: 0 };
  }

  changeImagesFullscreenOpened = () => {
    this.setState({
      imagesFullscreenOpened: !this.state.imagesFullscreenOpened,
    });
  };

  imageMapper = (image) => ({ url: image });
  windowWidth = Dimensions.get('window').width;
  syncCarousel = (index) =>
    setTimeout(() => this._carousel?.snapToItem(index, false, true), ImageViewerPageAnimationTimeoutMs);
  setCurrentImageIndex = (index) => this.setState({ currentImageIndex: index });

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.changeImagesFullscreenOpened}>
        <Image style={styles.image} source={{ uri: item }} onPress={this.changeImagesFullscreenOpened} />
      </TouchableOpacity>
    );
  };

  setCarouselRef = (c) => {
    this._carousel = c;
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
          ref={this.setCarouselRef}
          onSnapToItem={this.setCurrentImageIndex}
        />

        <View style={styles.imageGalleryBadgesContainer}>
          <Badge style={styles.imageGalleryBadge}>
            <Icon name="images-outline" style={styles.imageGalleryBadgeIcon} />
            <Text style={styles.ImageGalleryBadgeText}>
              &nbsp;{this.state.currentImageIndex + 1} из {images.length}
            </Text>
          </Badge>
        </View>

        <Modal
          visible={this.state.imagesFullscreenOpened}
          transparent={false}
          onRequestClose={this.changeImagesFullscreenOpened}>
          <ImageViewer
            enableSwipeDown={true}
            enablePreload={true}
            saveToLocalByLongPress={false}
            maxOverflow={0}
            index={this._carousel?.currentIndex}
            onCancel={this.changeImagesFullscreenOpened}
            onChange={this.syncCarousel}
            pageAnimateTime={ImageViewerPageAnimationTimeoutMs}
            imageUrls={images.map(this.imageMapper)}
            backgroundColor={appearanceBgColor}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

ImageGallery.propTypes = {
  ad: PropTypes.object.isRequired,
};
