import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Badge, Icon, View } from 'native-base';
import { TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-snap-carousel';

import { styles } from './Styles'

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

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.changeImagesFullscreenOpened}>
        <Image style={styles.image} source={{ uri: item }} onPress={this.changeImagesFullscreenOpened}/>
      </TouchableOpacity>
    );
  }

  render() {
    const { images } = this.props.ad;

    return (
      <React.Fragment>
        <Carousel data={images} renderItem={this._renderItem} itemWidth={Dimensions.get('window').width} sliderWidth={Dimensions.get('window').width}/>
        <View style={{width: '100%', height: 30, marginTop: -30, flex: 1,justifyContent: 'flex-end', padding: 12}}>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <Badge style={{backgroundColor: '#fff', flexDirection: 'row', borderColor: '#fff', borderWidth: 1, backgroundColor: 'transparent'}}>
              <Icon name='images-outline' style={{ fontSize: 15, color: '#fff', lineHeight: 20 }}/>
              <Text style={{color: '#fff'}}> {images.length}</Text>
            </Badge>
          </View>
        </View>
        <Modal visible={this.state.imagesFullscreenOpened} transparent={false}>
          <ImageViewer
            enableSwipeDown={true}
            enablePreload={true}
            saveToLocalByLongPress={false}
            maxOverflow={0}
            onCancel={this.changeImagesFullscreenOpened}
            imageUrls={images.map(image => ({ url: image }))}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

ImageGallery.propTypes = {
  ad: PropTypes.object.isRequired,
};
