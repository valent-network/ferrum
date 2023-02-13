import React from 'react';
import { View, Text, Icon } from 'native-base';

import styles from './Styles';

function ImageHeader({ currentIndex, allSize, onClose }) {
  return (
    <View style={styles.imageModalHeader}>
      <Icon name="close-outline" style={styles.spanIcon} />
      <Text style={styles.imageModalIndex}>
        {currentIndex + 1}/{allSize}
      </Text>
      <Icon name="close-outline" style={styles.imageModalCloseIcon} onPress={onClose} />
    </View>
  );
}

export default ImageHeader;
