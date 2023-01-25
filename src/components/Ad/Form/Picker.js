import React from 'react';
import { Platform } from 'react-native';
import { Item, Picker, Input, Label, Text, View, Right } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './Styles';
import { defaultPickerPropsFor, ResetPicker } from './helpers';

export default function AdPicker(props) {
  const { t } = useTranslation();

  if (!props.collection) {
    return null;
  }

  const { field, onReset, collection, paramName, errors, localizedName } = props;
  const setRef = (c) => {
    if (c) {
      field.ref(c._root);
    }
  };
  const error = errors[paramName];

  otherProps = {
    ...defaultPickerPropsFor(paramName, error),
    selectedValue: field.value,
    onValueChange: field.onChange,
    enabled: !props.disabled,
    ...props,
  };

  const picker = <Picker {...otherProps}>
    {Platform.OS === 'android' ? <Picker.Item label={t('actions.choose')} value={undefined}/> : <></>}
    {collection.map((element) => (
      <Picker.Item color={otherProps.itemStyle.color} key={`${paramName}-${element?.id || element}`} label={element.label} value={element.value} />
    ))}
  </Picker>

  return (
    <Item style={styles.inputContainer} picker>
      <View style={styles.pickerLabelContainer}>
        {!props.disabled && <ResetPicker value={field.value} onReset={onReset} />}
        <Label><Text style={[styles.labelText]}>{localizedName}</Text></Label>
      </View>
      {Platform.OS === 'android' ? picker : <Right>{picker}</Right>}
      <Input style={styles.inputRefPickerWorkaround} disabled ref={setRef} />
    </Item>
  );
}
