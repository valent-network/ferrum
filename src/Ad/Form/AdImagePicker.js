import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Text, Picker, Input, Icon, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import ImagePicker from 'react-native-image-crop-picker';

import styles from './Styles';
// import { defaultPickerPropsFor, ResetPicker } from './Helpers';

import { deletedColor, notesColor } from '../../Colors';

const OPTIONS = {
  includeBase64: true,
  compressImageQuality: 0.8,
  writeTempFile: false,
  mediaType: 'photo',
  forceJpg: true,
  multiple: true
}

const reposition = (i, index) => {return {...i, position: index}}

export default function AdImagePicker({adImages, register, setValue}) {

  const { t } = useTranslation();

  const openImagePicker = () => {
    ImagePicker.openPicker(OPTIONS).then((images) => {
      images.forEach((image, index) => {
        const appendIndex = index + adImages.length;
        const source = `data:${image.mime};base64,${image.data}`;
        register(`ad_images[${appendIndex}]`);
        setValue(`ad_images[${appendIndex}]`, {attachment: source, position: appendIndex})

      })
    });
  }

  const renderImage = (image) => {
    onDelete = () =>{
      const newAdImages = image.id ?
        adImages.map(i => i.position == image.position ? {...i, _destroy: true} : i) :
        adImages.filter(i => i.position !== image.position);

      setValue('ad_images', newAdImages.map(reposition));
    }


    onRestore = () => {
      const newAdImages = adImages.map(i => i.position == image.position ? {...i, _destroy: false} : i)

      setValue('ad_images', newAdImages.map(reposition));
    }

    const imageStyles = image._destroy ? [styles.adImage, styles.adImageDeleted] : [styles.adImage]
    const deletable = !!image.attachment || (!!image.id) || (typeof image.id == undefined && !!image.url)
    const imageSource = (image.id || !deletable) ? {uri: image.url} : {uri: image.attachment}

   return(<View style={styles.adImagesContainer}>
      <Image style={imageStyles} key={`ad-image-${image.position}`} source={imageSource}/>
      {deletable && !image._destroy && <Icon style={styles.deleteIcon} key={`ad-image-icon-${image.position}`} name='close-circle' onPress={onDelete} />}
      {deletable && image._destroy && <Text style={styles.restoreText} onPress={onRestore}>{t('ad.restore')}</Text>}
    </View>);
  }

  return(<>
    <View style={styles.adImageContainer}>
      <Text>{t('ad.params.ad_images')}</Text>
      <Text style={styles.addImageText} onPress={openImagePicker}>{t('ad.addImages')}</Text>
    </View>
    <View>
      {adImages.length > 0 && <ScrollView style={styles.adImagesContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
        {adImages.map(renderImage)}
      </ScrollView>}
    </View>
    {adImages.length > 0 && <Text>
      <Icon name='information-circle' style={styles.infoIcon} />
      {t('ad.params.notes.ad_images')}
    </Text>}
  </>);
};
