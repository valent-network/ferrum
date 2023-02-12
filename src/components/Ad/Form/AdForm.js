import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Platform, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Container, Content, View, Form, Icon, Button, Text, Left, Spinner } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './Styles';
import {
  defaultPickerPropsFor,
  handleFocusOnError,
  ResetPicker,
  rules,
  AD_IMAGES_PICKER_OPTIONS,
  AD_IMAGE_SIZE_LIMIT_BYTES,
} from './helpers';

import TextOrNumberInput from './TextOrNumberInput';
import Textarea from './Textarea';
import Picker from './Picker';
import AdImagePicker from './AdImagePicker';
import AdImagePickerItem from './AdImagePickerItem';
import { spinnerColor, activeColor, textColor, primaryColor, activeTextColor } from 'colors';
import { presignAndUploadToS3, onAdImagePickerImageSelected } from 'actions/ads';
import { showNotification } from 'actions/errors';

import { reposition } from 'utils';

const AdForm = ({
  defaultValues,
  onSubmit,
  citiesByRegion,
  categories,
  isLoading,
  newRecord,
  presignAndUploadToS3,
}) => {
  if (!categories.length) {
    return (
      <Container style={{ backgroundColor: primaryColor }}>
        <Content>
          <Spinner color={spinnerColor} />
        </Content>
      </Container>
    );
  }

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    register,
    resetField,
    setValue,
    getValues,
    setError,
    clearErrors,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    submitFocusError: false,
  });

  useEffect(() => {
    handleFocusOnError(errors, setFocus);
  }, [setFocus]);

  const [imagesUploading, setImagesUploading] = useState(false);

  register(`ad_images`);

  const adImages = useWatch({ control, name: 'ad_images' }).sort((a, b) => a.position - b.position);
  const categoryId = useWatch({ control, name: 'category_id' });
  const region = useWatch({ control, name: 'region' });
  const regions = Object.keys(citiesByRegion);
  const citiesOfRegionOpts = citiesByRegion[region]?.map((c) => {
    return { label: c.name, value: c.id };
  });
  const activeCategory = categories.filter((c) => c.id == categoryId)[0];

  if (activeCategory) {
    activeCategory.ad_option_types.forEach((opt) => register(`options[${opt.name}]`));
  }

  const categoriesOptsCollection = categories.map((c) => {
    return { label: c.name, value: c.id };
  });
  const regionsOptsCollection = regions.map((r) => {
    return { label: r, value: r };
  });

  const cityRules = { ...rules.city, required: !!region };

  const onComplete = (newImages) => {
    const imagesWithS3Keys = getValues('ad_images').map((i) => {
      return i.id
        ? i
        : {
            ...i,
            key: i.key || newImages.filter((n) => n.position === i.position)[0].key,
          };
    });
    setValue('ad_images', imagesWithS3Keys);
  };

  const onCityReset = () => resetField('city_id', { defaultValue: null });
  const onCategoryReset = () => {
    resetField('category_id', { defaultValue: null });
    resetField('options', { defaultValue: null });
  };
  const onRegionReset = () => {
    resetField('city_id', { defaultValue: null });
    resetField('region', { defaultValue: null });
  };
  const onSubmitWithReset = (data) => {
    if (adImages.length > 0) {
      data.tmp_images = data.ad_images
        .filter((i) => !i.id)
        .map((i) => {
          return { position: i.position, key: i.key };
        });
      data.ad_images = data.ad_images.filter((i) => i.id);

      onSubmit(data, reset);
    } else {
      setError('ad_images', { type: 'required' });
    }
  };
  const onError = (errors, e) => {
    if (adImages.length > 0) {
      console.warn(errors);
    } else {
      setError('ad_images', { type: 'required' });
    }
  };

  const textOrNumberInputControl =
    ({ paramName, paramType, placeholder }) =>
    ({ field }) => {
      return (
        <TextOrNumberInput
          paramName={paramName}
          paramType={paramType}
          field={field}
          errors={errors}
          placeholder={placeholder}
        />
      );
    };

  const textareaControl =
    ({ rowSpan, paramName }) =>
    ({ field }) => {
      return <Textarea rowSpan={rowSpan} paramName={paramName} field={field} errors={errors} />;
    };

  const pickerControl =
    ({ paramName, collection, onReset, disabled }) =>
    ({ field }) => {
      const pickerProps = {
        disabled: disabled,
        field: field,
        paramName: paramName,
        collection: collection,
        onReset: onReset,
        errors: errors,
        localizedName: t(`ad.params.${paramName}`),
      };
      return <Picker {...pickerProps} />;
    };

  const categoryOptionsPickerControl =
    ({ name, values, localized_name, input_type }) =>
    ({ field }) => {
      const onReset = () => resetField(`options[${name}]`, { defaultValue: null });
      const collectionOpts = values.map((c) => {
        return { label: c.name, value: c.name };
      });

      if (input_type == 'picker') {
        const pickerProps = {
          field: field,
          paramName: `options[${name}]`,
          collection: collectionOpts,
          onReset: onReset,
          errors: errors,
          iosHeader: localized_name,
          localizedName: localized_name,
          placeholder: t('actions.choose'),
          errors: errors,
        };

        return <Picker {...pickerProps} />;
      } else {
        const inputProps = {
          paramName: name,
          paramType: input_type,
          field: field,
          errors: errors,
          localized_name: localized_name,
        };

        return <TextOrNumberInput {...inputProps} />;
      }
    };

  const ErrorMessage = ({ errorName }) => {
    const error = errors[errorName];

    if (!error) {
      return null;
    }

    const errorText = ['min', 'max', 'minLength', 'maxLength'].includes(error.type)
      ? `${t(`ad.formErrors.${error.type}`)} ${rules[errorName][error.type]}`
      : t(`ad.formErrors.${error.type}`);

    return (
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessageText}>{errorText}</Text>
      </View>
    );
  };

  const updateCollection = (newCollection) => setValue('ad_images', newCollection.map(reposition));
  const makeMain = (image) =>
    setValue('ad_images', [image, ...adImages.filter((i) => i.position !== image.position)].map(reposition));
  const renderImage = (image) => {
    const makeMainImage = () => makeMain(image);

    return (
      <AdImagePickerItem
        image={image}
        collection={adImages}
        updateCollection={updateCollection}
        makeMain={makeMainImage}
        key={`ad-image-${image.position}`}
      />
    );
  };
  const onImageSelected = onAdImagePickerImageSelected({
    onProgress: (index) => (written, total) => {
      setValue(`ad_images[${index}]`, {
        ...getValues(`ad_images[${index}]`),
        opacity: written / total,
      });
    },
    attachtImageToForm: (image) => {
      register(`ad_images[${image.position}]`);
      setValue(`ad_images[${image.position}]`, image);
    },
    currentCollection: adImages,
  });

  const openImagePicker = () => {
    setImagesUploading(true);

    ImagePicker.openPicker(AD_IMAGES_PICKER_OPTIONS)
      .then((images) => {
        const validImages = images.filter((i) => i.size <= AD_IMAGE_SIZE_LIMIT_BYTES);
        clearErrors('ad_images');

        if (validImages.length != images.length) {
          showNotification(t('ad.formErrors.imageSize.title'), t('ad.formErrors.imageSize.message'));
        }

        if (validImages.length > 0) {
          presignAndUploadToS3({ images: validImages.map(onImageSelected), onComplete });
        } else if (adImages.length === 0) {
          setError('ad_images', { type: 'required' });
        }

        setImagesUploading(false);
      })
      .catch((e) => {
        console.warn(e);
        setImagesUploading(false);
      });
  };

  return (
    <Container style={{ backgroundColor: primaryColor }}>
      <Content padder enableResetScrollToCoords={false}>
        <Form>
          <View style={[styles.pickerContainer, { padding: 8, paddingVertical: 16 }]}>
            <AdImagePicker
              adImages={adImages}
              renderImage={renderImage}
              onPress={openImagePicker}
              error={errors.ad_images}
            />
            {!defaultValues.native && (
              <Text style={{ color: textColor }}>
                <Icon name="information-circle" style={styles.infoIcon} />
                {t('ad.params.notes.ad_images_non_native')}
              </Text>
            )}
          </View>
          <ErrorMessage errorName="ad_images" />

          <View style={styles.pickerContainer}>
            <Controller
              control={control}
              rules={rules.category_id}
              name="category_id"
              render={pickerControl({
                paramName: 'category_id',
                collection: categoriesOptsCollection,
                onReset: onCategoryReset,
                disabled: !newRecord,
              })}
            />
          </View>
          <ErrorMessage errorName="category_id" />

          <View style={styles.pickerContainer}>
            <Controller
              control={control}
              rules={rules.region}
              name="region"
              render={pickerControl({ paramName: 'region', collection: regionsOptsCollection, onReset: onRegionReset })}
            />
            {!!region && (
              <Controller
                control={control}
                rules={cityRules}
                name="city_id"
                render={pickerControl({ paramName: 'city_id', collection: citiesOfRegionOpts, onReset: onCityReset })}
              />
            )}
          </View>
          <ErrorMessage errorName="city_id" />

          <Controller
            control={control}
            rules={rules.title}
            name="title"
            render={textOrNumberInputControl({
              paramName: 'title',
              paramType: 'default',
              placeholder: t(`ad.params.placeholders.title`),
            })}
          />
          <ErrorMessage errorName="title" />

          <View>
            <Controller
              control={control}
              rules={rules.price}
              name="price"
              render={textOrNumberInputControl({
                paramName: 'price',
                paramType: 'number',
                placeholder: t(`ad.params.placeholders.price`),
              })}
            />
            <Text style={styles.currency}>{activeCategory?.currency}</Text>
          </View>
          <ErrorMessage errorName="price" />

          <Controller
            control={control}
            rules={rules.short_description}
            name="short_description"
            render={textareaControl({ rowSpan: 3, paramName: 'short_description' })}
          />
          <ErrorMessage errorName="short_description" />

          <Controller
            control={control}
            rules={rules.description}
            name="description"
            render={textareaControl({ rowSpan: 5, paramName: 'description' })}
          />
          <ErrorMessage errorName="description" />

          {!!categoryId &&
            activeCategory?.ad_option_types
              .filter((opt) => opt.filterable)
              .map((opt) => (
                <Controller
                  key={`opt-${opt.id}`}
                  control={control}
                  name={`options[${opt.name}]`}
                  render={categoryOptionsPickerControl(opt)}
                />
              ))}
          {!!categoryId &&
            activeCategory?.ad_option_types
              .filter((opt) => !opt.filterable)
              .map((opt) => (
                <Controller
                  key={`opt-${opt.id}`}
                  control={control}
                  name={`options[${opt.name}]`}
                  render={categoryOptionsPickerControl(opt)}
                />
              ))}
        </Form>
        <View style={styles.submitButtonWrapper}>
          <Button
            disabled={imagesUploading}
            style={styles.submitButton}
            block
            onPress={handleSubmit(onSubmitWithReset, onError)}
          >
            {isLoading || imagesUploading ? (
              <Spinner color={spinnerColor} />
            ) : (
              <Text style={{ color: activeTextColor }}>{newRecord ? t('actions.create') : t('actions.update')}</Text>
            )}
          </Button>
        </View>
      </Content>
    </Container>
  );
};

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    presignAndUploadToS3: ({ images, onComplete }) => dispatch(presignAndUploadToS3({ images, onComplete })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdForm);
