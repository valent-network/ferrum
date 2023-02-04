import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Icon, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import { simpleColor } from 'colors';

import styles from './Styles';

export default function AdImagePicker({ adImages, renderImage, onPress, error }) {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.adImageContainer}>
        <Text style={error ? styles.labelTextError : styles.labelText}>{t('ad.params.ad_images')}</Text>
        <Text style={error ? styles.addImageTextError : styles.addImageText} onPress={onPress}>
          {t('ad.addImages')}
        </Text>
      </View>
      <View>
        {adImages.length > 0 && (
          <ScrollView style={styles.adImagesContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            {adImages.map(renderImage)}
          </ScrollView>
        )}
      </View>
      {adImages.length > 0 && (
        <Text style={{ color: simpleColor }}>
          <Icon name="information-circle" style={styles.infoIcon} />
          {t('ad.params.notes.ad_images')}
        </Text>
      )}
    </>
  );
}
