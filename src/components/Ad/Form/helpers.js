import React from 'react';
import { Right, Icon } from 'native-base';

import I18n from 'services/i18n';
import API from 'services/API';
import { errorColor } from 'colors';
import styles from './Styles';

export const defaultValues = {
  title: '',
  short_description: '',
  description: '',
  city_id: null,
  category_id: null,
  price: null,
  options: {},
  region: null,
  ad_images: [],
  native: true,
};

export function onlyNumeric(callback) {
  return (val) => callback(val.replace(/[^\d]+/, ''));
}

export function defaultPickerPropsFor(param, errors) {
  return {
    mode: 'dropdown',
    style: { width: undefined },
    textStyle: styles.pickerText,
    placeholderStyle: errors ? [styles.pickerPlaceholder, { color: errorColor }] : styles.pickerPlaceholder,
    headerStyle: styles.pickerHeader,
    headerBackButtonTextStyle: styles.headerBackButton,
    headerTitleStyle: styles.headerTitle,
    itemStyle: styles.pickerItemStyle,
    headerBackButtonText: I18n.t('actions.back'),
    placeholder: I18n.t(`ad.params.placeholders.${param}`),
    iosHeader: I18n.t(`ad.params.${param}`),
  };
}

export function handleFocusOnError(errors, setFocus) {
  const errorInput = Object.keys(errors)[0];

  if (errorInput) {
    setFocus(errorInput);
  }

  // if (errorInput) {
  //   if (Platform.OS === 'ios' && (errorInput === 'short_description' || errorInput == 'description')) {
  //     // TODO: https://github.com/facebook/react-native/issues/35717
  //     setFocus('title');
  //     setFocus(errorInput);
  //   } else {
  //     setFocus(errorInput);
  //   }
  // }
}

export function ResetPicker({ value, onReset }) {
  if (!value) {
    return null;
  }

  return (
    <Right>
      <Icon name="close-circle-outline" style={styles.resetPickerIcon} onPress={onReset} />
    </Right>
  );
}

export const rules = {
  title: { required: true, minLength: 5, maxLength: 80 },
  short_description: { required: true, minLength: 5, maxLength: 160 },
  description: { required: true, minLength: 5, maxLength: 1760 },
  price: { required: true, min: 0, max: 1000000, pattern: /^(0|([^0](\d+)?))$/i },
  category_id: { required: true },
  region: {},
  city_id: {},
};
