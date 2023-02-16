import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Item, Icon, Spinner } from 'native-base';
import { useTranslation } from 'react-i18next';

import { disabledColor, secondaryColor, textColor } from 'colors';

export default function SearchBar({ onReset, onSearch, query, isLoading, placeholder, backgroundColor }) {
  const { t } = useTranslation();

  let typingTimer;

  const onChangeQueryWithDelay = (text) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(onSearch(text), 200);
  };

  return (
    <View style={[styles.searchBar, { backgroundColor: backgroundColor }]}>
      {isLoading ? (
        <Spinner color={disabledColor} size={'small'} style={styles.spinner} />
      ) : (
        <Icon allowFontScaling={true} name="ios-search" style={styles.searchIcon} />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={disabledColor}
        style={[styles.inputTextColor, styles.searchBarInput]}
        onChangeText={onChangeQueryWithDelay}
        defaultValue={query}
        returnKeyType={'done'}
      />
      {query.length > 0 && (
        <Icon allowFontScaling={true} name="close-circle" style={styles.resetIcon} onPress={onReset} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 8,
    backgroundColor: secondaryColor,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginHorizontal: 8,
    paddingVertical: 0,
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
  },
  searchIcon: {
    color: disabledColor,
    fontSize: 20,
    marginLeft: 8,
    flex: null,
  },
  resetIcon: {
    color: disabledColor,
    fontSize: 18,
    marginRight: 8,
    flex: null,
    textAlign: 'right',
  },
  searchBarInput: {
    fontSize: 18,
    flex: 1,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 8,
  },
  inputTextColor: {
    color: textColor,
  },
  spinner: { alignSelf: 'center', height: 'auto', marginLeft: 8 },
});
