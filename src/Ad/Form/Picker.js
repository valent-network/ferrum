import React from 'react';
import { Item, Picker, Input } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './Styles';
import { defaultPickerPropsFor, ResetPicker } from './Helpers';

export default function AdPicker(props) {
  if (!props.collection) { return(null); }

  const { field, onReset, collection, paramName, errors } = props;
  const setRef = (c) => { if (c) { field.ref(c._root); } }
  const error = errors[paramName];

   otherProps = {
    ...defaultPickerPropsFor(paramName, error),
    selectedValue: field.value,
    onValueChange: field.onChange,
    enabled: !props.disabled,
    ...props
  }

  return <Item style={styles.inputContainer} picker>
    <Picker {...otherProps}>
      {collection.map(element => <Picker.Item key={`${paramName}-${element?.id || element}`} label={element.label} value={element.value} />)}
    </Picker>
    <Input style={styles.inputRefPickerWorkaround} ref={setRef} />
    {!props.disabled && <ResetPicker value={field.value} onReset={onReset} />}
  </Item>
};