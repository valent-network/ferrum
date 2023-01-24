import React from 'react';
import { Item, Picker, Input, Label, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './Styles';
import { defaultPickerPropsFor, ResetPicker } from './helpers';

export default function AdPicker(props) {
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

  return (
    <Item style={styles.inputContainer} picker>
      <Label>
        <Text style={styles.labelText}>{localizedName}</Text>
      </Label>
      <Picker {...otherProps}>
        {collection.map((element) => (
          <Picker.Item key={`${paramName}-${element?.id || element}`} label={element.label} value={element.value} />
        ))}
      </Picker>
      <Input style={styles.inputRefPickerWorkaround} ref={setRef} />
      {!props.disabled && <ResetPicker value={field.value} onReset={onReset} />}
    </Item>
  );
}
