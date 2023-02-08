import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Platform } from 'react-native';
import { Spinner } from 'native-base';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { secondaryColor, spinnerColor, textColor } from 'colors';
import { AD_IMAGE_HEIGHT } from 'utils';

function ImageSlide({ source, onPress }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const onLoad = useCallback(() => setIsLoading(false), []);
  const onLoadStart = useCallback(() => setIsLoading(true), []);
  const onError = useCallback(() => {
    setError(true);
    setIsLoading(false);
  }, []);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.mainContainer}>
      {error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{t('ad.errors.imageNotLoaded')}</Text>
        </View>
      )}
      {isLoading && !error && (
        <View style={isLoading ? styles.activePlaceholder : styles.hiddenPlaceholder}>
          <Spinner color={spinnerColor} />
        </View>
      )}
      {!error && (
        <FastImage
          style={styles.fastImage}
          source={source}
          resizeMode={FastImage.resizeMode.cover}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onError={onError}
          fallback={Platform.OS === 'android'}
        />
      )}
    </TouchableOpacity>
  );
}

function arePropsEqual(oldProps, newProps) {
  return oldProps.source.uri === newProps.source.uri && oldProps.source.priority === newProps.source.priority;
}

export default React.memo(({ source, onPress }) => <ImageSlide source={source} onPress={onPress} />, arePropsEqual);

const styles = StyleSheet.create({
  mainContainer: { height: AD_IMAGE_HEIGHT },
  activePlaceholder: {
    height: AD_IMAGE_HEIGHT,
    opacity: 1,
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenPlaceholder: {
    height: 0,
    opacity: 0,
  },
  error: {
    backgroundColor: secondaryColor,
    height: AD_IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fastImage: { height: AD_IMAGE_HEIGHT },
  errorText: { color: textColor, textAlign: 'center' },
});
