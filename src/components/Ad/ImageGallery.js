import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Badge, Icon, View } from 'native-base';
import { TouchableOpacity, Image, Modal, Dimensions, SafeAreaView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-snap-carousel';

import { styles } from './Styles';

import { primaryColor, simpleColor } from 'colors';

const ImageViewerPageAnimationTimeoutMs = 150;

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imagesFullscreenOpened: false, currentImageIndex: 0 };
  }

  handleOnPress = () => {
    this.props.withModal
      ? this.setState({
          imagesFullscreenOpened: !this.state.imagesFullscreenOpened,
        })
      : this.props.onPress();
  };

  imageMapper = (image) => ({ url: image.url });
  windowWidth = Dimensions.get('window').width;
  syncCarousel = (index) =>
    setTimeout(() => this._carousel?.snapToItem(index, false, true), ImageViewerPageAnimationTimeoutMs);
  setCurrentImageIndex = (index) => this.setState({ currentImageIndex: index });

  _renderItem = ({ item, index }) => {
    const url = item.url;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.handleOnPress}>
        <Image style={this.props.imageStyle} source={{ uri: url, cache: 'force-cache' }} />
      </TouchableOpacity>
    );
  };

  setCarouselRef = (c) => {
    this._carousel = c;
  };

  render() {
    const { images } = this.props.ad;
    const { withModal } = this.props;

    return (
      <>
        <Carousel
          data={images}
          renderItem={this._renderItem}
          itemWidth={this.windowWidth}
          sliderWidth={this.windowWidth}
          ref={this.setCarouselRef}
          onSnapToItem={this.setCurrentImageIndex}
        />
        <View style={this.props.badgeStyle || styles.imageGalleryBadgesContainer}>
          <Badge style={styles.imageGalleryBadge}>
            <Icon allowFontScaling={true} name="images-outline" style={styles.imageGalleryBadgeIcon} />
            <Text style={styles.imageGalleryBadgeText}>
              &nbsp;{this.state.currentImageIndex + 1} / {this.props.ad.images.length}
            </Text>
          </Badge>
        </View>

        {withModal && (
          <Modal
            visible={this.state.imagesFullscreenOpened}
            transparent={true}
            animationType="fade"
            onRequestClose={this.handleOnPress}
          >
            <View style={styles.imageGalleryModalContainer}>
              <ImageViewer
                enableSwipeDown={true}
                enablePreload={true}
                saveToLocalByLongPress={false}
                maxOverflow={0}
                flipThreshold={1}
                index={this._carousel?.currentIndex}
                onCancel={this.handleOnPress}
                onChange={this.syncCarousel}
                pageAnimateTime={ImageViewerPageAnimationTimeoutMs}
                imageUrls={images.map(this.imageMapper)}
                backgroundColor={primaryColor}
              />
            </View>
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  ad: PropTypes.object.isRequired,
};
