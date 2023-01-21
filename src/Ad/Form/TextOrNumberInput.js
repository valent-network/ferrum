import React from 'react';
import { Item, Label, Text, Input } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './Styles';
import { onlyNumeric, rules } from './Helpers';

export default function TextOrNumberInput({ field, paramName, paramType, errors }) {
    const { t } = useTranslation();

    const numericKeyboardType = Platform.OS === 'android' ? 'numeric' : 'number-pad';
    const keyboardType = paramType === 'number' ? numericKeyboardType : 'default';
    const setRef = c => field.ref(c?._root);
    const error = errors[paramName];

    return <Item style={styles.inputContainer}>
      <Label><Text style={error ? styles.labelTextError : styles.labelText}>{t(`ad.params.${paramName}`)}</Text></Label>
      <Input style={styles.input}
             onBlur={field.onBlur}
             onChangeText={paramType === 'number' ? onlyNumeric(field.onChange) : field.onChange}
             value={field.value}
             returnKeyType='next'
             keyboardType={keyboardType}
             ref={setRef}
       />
       {rules[paramName]?.maxLength && <Text style={styles.charLimitText}>{field.value ? field.value.length : 0} / {rules[paramName].maxLength}</Text>}
    </Item>
  };