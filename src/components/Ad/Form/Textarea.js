import React from 'react';
import { Text, Textarea, View, Input, Label } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './Styles';
import { rules } from './helpers';

export default function AdTextarea({ field, rowSpan, paramName, errors }) {
  const { t } = useTranslation();

  const setRef = (c) => {
    c ? field.ref(c._root) : null;
  };
  const error = errors[paramName];

  return (
    <View style={styles.textAreaContainer}>
      <Input style={styles.inputRefTextareaWorkaround} ref={setRef} />
      <Label style={styles.textAreaLabel}>
        <Text style={error ? styles.labelTextError : styles.labelText}>{t(`ad.params.${paramName}`)}</Text>
      </Label>
      <Textarea
        style={styles.textArea}
        rowSpan={rowSpan}
        bordered
        placeholder={t(`ad.params.placeholders.${paramName}`)}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
      />
      <View style={[styles.charLimitContainer, error ? styles.textAreaFooterError : styles.textAreaFooter]}>
        <Text style={styles.charLimitText}>
          {field.value ? field.value.length : 0} / {rules[paramName].maxLength}
        </Text>
      </View>
    </View>
  );
}
