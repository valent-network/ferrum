import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

function ImageSlide({ url, onPress }) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Image style={{ height: 350 }} source={{ uri: url, cache: 'force-cache' }} />
    </TouchableOpacity>
  );
}

export default React.memo(ImageSlide);
