import React from 'react';
import { Image } from 'react-native';
import { View, Text, Icon, Button } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './Styles';

export default function AdImagePickerItem({ image, collection, updateCollection, makeMain }) {
  onDelete = () => {
    const newCollection = image.id
      ? collection.map((i) => (i.position == image.position ? { ...i, _destroy: true } : i))
      : collection.filter((i) => i.position !== image.position);

    updateCollection(newCollection);
  };

  onRestore = () => {
    const newCollection = collection.map((i) => (i.position == image.position ? { ...i, _destroy: false } : i));

    updateCollection(newCollection);
  };

  const imageStyles = image._destroy ? [styles.adImage, styles.adImageDeleted] : [styles.adImage];
  const deletable = !!image.attachment || !!image.id || (typeof image.id == undefined && !!image.url);
  const imageSource = image.id || !deletable ? { uri: image.url } : { uri: image.attachment };

  const { t } = useTranslation();

  return (
    <View style={styles.adImagesContainer}>
      <Image style={imageStyles} key={`ad-image-${image.position}`} source={imageSource} />
      {deletable && !image._destroy && (
        <Icon
          style={styles.deleteIcon}
          key={`ad-image-icon-${image.position}`}
          name="close-circle"
          onPress={onDelete}
        />
      )}
      {deletable && image._destroy && (
        <Text style={styles.restoreText} onPress={onRestore}>
          {t('ad.restore')}
        </Text>
      )}
      {image.position != 0 && (
        <Button small block dark style={styles.makeMainButton} onPress={makeMain}>
          <Text>{t('ad.assign_as_main_image')}</Text>
        </Button>
      )}
    </View>
  );
}
