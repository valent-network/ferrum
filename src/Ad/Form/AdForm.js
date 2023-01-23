import React, { useEffect } from 'react';
import { Platform, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Container, Content, View, Form, Icon, Button, Text, Left, Header, Spinner } from 'native-base';



import styles from './Styles';
import { defaultPickerPropsFor, handleFocusOnError, ResetPicker, rules } from './Helpers';

import TextOrNumberInput from './TextOrNumberInput';
import Textarea from './Textarea';
import Picker from './Picker';
import AdImagePicker from './AdImagePicker';
import { spinnerColor, activeColor, lightColor } from '../../Colors';

export default AdForm = ({ defaultValues, onSubmit, citiesByRegion, categories, isLoading, newRecord }) => {
  if (!categories.length) { 
    return (
      <Container>
        <Content>
          <Spinner color={spinnerColor} />
        </Content>
      </Container>
    );
  }

  const { t } = useTranslation();

  const { control, handleSubmit, register, resetField, setValue, setFocus, reset, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    submitFocusError: false,
  });

  register(`ad_images`);

  const adImages = useWatch({control, name: 'ad_images'}).sort((a, b) => a.position - b.position);
  const categoryId = useWatch({control, name: 'category_id'});
  const region = useWatch({control, name: 'region'});
  const regions = Object.keys(citiesByRegion);
  const citiesOfRegionOpts = citiesByRegion[region]?.map(c => {return{label: c.name, value: c.id}});
  const activeCategory = categories.filter(c => c.id == categoryId)[0];
  const categoriesOptsCollection = categories.map(c => {return{label: c.name, value: c.id}});
  const regionsOptsCollection = regions.map(r => {return{label: r, value: r}});

  const cityRules = {...rules.city, required: !!region};

  const onCityReset = () => resetField('city_id', {defaultValue: null});
  const onCategoryReset = () => {
    resetField('category_id', {defaultValue: null});
    resetField('options', {defaultValue: null});
  }
  const onRegionReset = () => {
    resetField('city_id', {defaultValue: null});
    resetField('region', {defaultValue: null});
  };
  const onSubmitWithReset = (data) => {
    onSubmit(data, reset);
  }

  const textOrNumberInputControl = ({paramName, paramType, placeholder}) => ({ field }) => {
    return <TextOrNumberInput paramName={paramName} paramType={paramType} field={field} errors={errors} placeholder={placeholder} />
  }

  const textareaControl = ({rowSpan, paramName}) => ({ field }) => {
    return <Textarea rowSpan={rowSpan} paramName={paramName} field={field} errors={errors} />
  };

  const pickerControl = ({paramName, collection, onReset, disabled}) => ({ field }) => {
    const pickerProps = {
      disabled: disabled,
      field: field,
      paramName: paramName,
      collection: collection,
      onReset: onReset,
      errors: errors,
      localizedName: t(`ad.params.${paramName}`)
    }
    return <Picker {...pickerProps}/>
  };

  const categoryOptionsPickerControl = ({name, values, localized_name, input_type}) => ({ field }) => {
    const onReset = () => resetField(`options[${name}]`, {defaultValue: null});
    const collectionOpts = values.map(c => {return{label: c.name, value: c.name}});

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
      }

      return <Picker {...pickerProps}/>
    } else {
      const inputProps = {
        paramName: name,
        paramType: input_type,
        field: field,
        errors: errors,
        localized_name: localized_name,
      }

      return <TextOrNumberInput {...inputProps}/>
    }
  }

  useEffect(() => {
    handleFocusOnError(errors, setFocus);
  }, [setFocus])

  return (
    <Container>
      <Content padder enableResetScrollToCoords={false}>
        <Form>
          <View style={[styles.pickerContainer, {padding: 8, paddingVertical: 16}]}>
            <AdImagePicker adImages={adImages} register={register} setValue={setValue} />
            {!defaultValues.native && <Text>
              <Icon name='information-circle' style={styles.infoIcon} />
              {t('ad.params.notes.ad_images_non_native')}
            </Text>}
          </View>
          <View style={styles.pickerContainer}>
            <Controller control={control} rules={rules.category_id} name='category_id' render={pickerControl({paramName: 'category_id', collection: categoriesOptsCollection, onReset: onCategoryReset, disabled: !newRecord})}/>
          </View>

          <View style={styles.pickerContainer}>
            <Controller control={control} rules={rules.region} name='region' render={pickerControl({paramName: 'region', collection: regionsOptsCollection, onReset: onRegionReset})}/>
            {!!region && <Controller control={control} rules={cityRules} name='city_id' render={pickerControl({paramName: 'city_id', collection: citiesOfRegionOpts, onReset: onCityReset})}/>}
          </View>

          <Controller control={control} rules={rules.title} name='title' render={textOrNumberInputControl({ paramName: 'title', paramType: 'default', placeholder: t(`ad.params.placeholders.title`)})} />
          <View>
            <Controller control={control} rules={rules.price} name='price' render={textOrNumberInputControl({ paramName: 'price', paramType: 'number', placeholder: t(`ad.params.placeholders.price`)})} />
            <Text style={styles.currency}>{activeCategory?.currency}</Text>
          </View>
          <Controller control={control} rules={rules.short_description} name='short_description' render={textareaControl({rowSpan: 3, paramName: 'short_description'})} />
          <Controller control={control} rules={rules.description} name='description' render={textareaControl({rowSpan: 5, paramName: 'description'})} />

          {!!categoryId && activeCategory?.ad_option_types.filter(opt => opt.filterable).map(opt => <Controller key={`opt-${opt.id}`} control={control} name={`options[${opt.name}]`} render={categoryOptionsPickerControl(opt)}/>)}
          {!!categoryId && activeCategory?.ad_option_types.filter(opt => !opt.filterable).map(opt => <Controller key={`opt-${opt.id}`} control={control} name={`options[${opt.name}]`} render={categoryOptionsPickerControl(opt)}/>)}
        </Form>
      </Content>

      <View style={styles.submitButtonWrapper}>
        <Button style={styles.submitButton} block onPress={handleSubmit(onSubmitWithReset)}>
          {isLoading ? 
            <Spinner color={spinnerColor} />
            :
            <Text>{newRecord ? t('actions.create') : t('actions.update')}</Text>
          }
        </Button>
      </View>
    </Container>
  );
};
