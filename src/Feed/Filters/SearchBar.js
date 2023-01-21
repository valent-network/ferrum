import React from 'react';
import { connect } from 'react-redux';
import { Item, Icon, Input } from 'native-base';
import { useTranslation } from 'react-i18next';

import { applyFilter } from '../feedActions';

import styles from './Styles';

import { disabledColor } from '../../Colors';

function SearchBar({onReset, onSearch, query}) {
  const { t } = useTranslation();

  let typingTimer;

  const onChangeQueryWithDelay = (text) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(onSearch(text), 200);
  };


  return <Item style={styles.searchBar}>
    <Icon name="ios-search" style={styles.searchIcon} />
    <Input
      placeholder={t('feed.search.placeholder')}
      placeholderTextColor={disabledColor}
      style={[styles.inputTextColor, styles.searchBarInput]}
      onChangeText={onChangeQueryWithDelay}
      defaultValue={query}
      returnKeyType={'done'}
    />
    {query.length > 0 && (
      <Icon name="close-circle" style={styles.inputTextColor} onPress={onReset} />
    )}
  </Item>
}

function mapStateToProps(state) {
  return {
    query: state.filters.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onReset: () => dispatch(applyFilter('query', ''), []),
    onSearch: (text) => () => dispatch(applyFilter('query', text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
