import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Icon, View } from 'native-base';
import { TouchableOpacity, Image, Modal, Dimensions, SafeAreaView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-snap-carousel';
import { withTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import ImageHeader from './ImageHeader';
import ImageSlide from './ImageSlide';

import styles from './Styles';

import { primaryColor, textColor, secondaryColor } from 'colors';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imagesFullscreenOpened: false, currentImageIndex: 0 };
  }

  windowWidth = Dimensions.get('window').width;
  animateTime = 150;
  imageURLs = this.props.ad.images.map((image) => ({ url: image.url }));

  syncCarousel = (index) => setTimeout(() => this._carousel?.snapToItem(index, false, true), this.animateTime);
  setCurrentImageIndex = (index) => this.setState({ currentImageIndex: index });
  _renderItem = ({ item }) => (
    <ImageSlide
      source={
        item.position === 0
          ? { priority: FastImage.priority.high, uri: item.url }
          : { priority: FastImage.priority.normal, uri: item.url }
      }
      onPress={this.handleOnPress}
    />
  );
  setCarouselRef = (c) => (this._carousel = c);
  renderHeader = (currentIndex, allSize) => (
    <ImageHeader currentIndex={currentIndex} allSize={this.props.ad.images.length} onClose={this.handleOnPress} />
  );
  renderIndicator = () => null;
  openViewerModal = () => this.setState({ imagesFullscreenOpened: !this.state.imagesFullscreenOpened });
  handleOnPress = () => (this.props.withModal ? this.openViewerModal() : this.props.onPress());

  render() {
    const { images } = this.props.ad;
    const { t, withModal } = this.props;

    return (
      <>
        {images.length > 0 && (
          <Carousel
            inactiveSlideScale={1}
            initialNumToRender={3}
            windowSize={3}
            data={images}
            renderItem={this._renderItem}
            itemWidth={this.windowWidth}
            sliderWidth={this.windowWidth}
            ref={this.setCarouselRef}
            onSnapToItem={this.setCurrentImageIndex}
          />
        )}
        {images.length > 0 && (
          <View style={this.props.badgeStyle || styles.imageGalleryBadgesContainer}>
            <View style={styles.imageGalleryBadge}>
              <Text style={styles.imageGalleryBadgeText}>
                {`${this.state.currentImageIndex + 1} / ${images.length}`}
              </Text>
            </View>
          </View>
        )}

        {images.length === 0 && !withModal && (
          <TouchableOpacity onPress={this.handleOnPress}>
            <View style={styles.imageProcessingPlaceholder}>
              <Text style={styles.imageProcessingText}>{t('ad.errors.imageProcessing')}</Text>
            </View>
          </TouchableOpacity>
        )}

        {images.length === 0 && withModal && (
          <View style={styles.imageProcessingPlaceholder}>
            <Text style={styles.imageProcessingText}>{t('ad.errors.imageProcessing')}</Text>
          </View>
        )}

        {withModal && (
          <Modal
            visible={this.state.imagesFullscreenOpened}
            transparent={false}
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
                pageAnimateTime={this.animateTime}
                imageUrls={this.props.ad.images.map((image) => ({ url: image.url }))}
                backgroundColor={primaryColor}
                renderHeader={this.renderHeader}
                renderIndicator={this.renderIndicator}
              />
            </View>
          </Modal>
        )}
      </>
    );
  }
}

export default withTranslation()(ImageGallery);

ImageGallery.propTypes = {
  ad: PropTypes.object.isRequired,
};
