import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, SafeAreaView } from 'react-native';
import { View, Text, Item, Icon, Input, Button, H1, H2, H3, Form, Label, Content, Spinner } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';

import Navigation from 'services/Navigation';

import * as ActionTypes from 'actions/types';

import { applyFilter, resetFilters } from 'actions/feed';

import { activeTextColor, spinnerColor } from 'colors';
import { positionSorter } from 'utils';

import styles from './Styles';

import MultiPicker from './MultiPicker';

const FiltersModal = ({
  category_id,
  min_price,
  max_price,
  filtersPresent,
  categoriesValues,
  currentCategory,
  applyFilter,
  filterReset,
  modalVisible,
  switchModalVisible,
}) => {
  const { t } = useTranslation();

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const pickerOpts = currentCategory?.ad_option_types.filter((opt) => opt.filterable && opt.input_type == 'picker');
  const categoryOpts = {
    name: 'category_id',
    localized_name: t('feed.filters.headers.category'),
    values: categoriesValues,
  };
  const categoryOptsMultipicker = useCallback(
    <MultiPicker name={categoryOpts.name} localized_name={categoryOpts.localized_name} values={categoryOpts.values} />,
    [categoryOpts.name, categoryOpts.values.join('')],
  );

  applyMinPrice = (event) => applyFilter('min_price', event.nativeEvent.text);
  applyMaxPrice = (event) => applyFilter('max_price', event.nativeEvent.text);

  const onReset = useCallback(() => {
    setMinPrice(null);
    setMaxPrice(null);
    filterReset();
  }, [setMaxPrice, setMinPrice, filterReset]);

  const onClose = useCallback(() => {
    if (minPrice) {
      applyFilter('min_price', minPrice);
    }
    if (maxPrice) {
      applyFilter('max_price', maxPrice);
    }
    switchModalVisible();
  }, [minPrice, maxPrice]);

  const reset = (
    <H3 onPress={onReset} style={styles.resetControl}>
      {t('feed.filters.headers.reset')}
    </H3>
  );
  const close = <Icon name="close-outline" onPress={onClose} style={styles.closeIcon} />;

  const mapper = useCallback(
    (opt) => (
      <MultiPicker key={`opt-${opt.id}`} name={opt.name} localized_name={opt.localized_name} values={opt.values} />
    ),
    [],
  );

  const submitButton = useCallback(
    <View style={styles.submitButtonWrapper}>
      <Button block onPress={onClose} style={styles.submitButton}>
        <Text style={styles.activeTextColor}>{t('feed.filters.submit')}</Text>
      </Button>
    </View>,
    [onClose],
  );

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalControlsContainer}>
          <H1 style={styles.filtersHeader}>{t('feed.filters.headers.main')}</H1>
          {filtersPresent && reset}
          {close}
        </View>
        <KeyboardAwareScrollView
          style={styles.modalContainer}
          keyboardShouldPersistTaps="always"
          bounces={false}
          extraHeight={296}
        >
          <Form style={styles.filtersForm}>
            {categoryOpts.values.length > 0 ? categoryOptsMultipicker : <Spinner color={spinnerColor} />}

            {!!currentCategory && (
              <>
                <H2 style={styles.filterTitle}>{`${t('feed.filters.headers.price')}, ${currentCategory.currency}`}</H2>
                <View style={styles.rangeItemWrapper}>
                  <Item style={styles.rangeItem}>
                    <Label>{t('feed.filters.from')}</Label>
                    <Input
                      style={styles.inputTextColor}
                      keyboardType="numeric"
                      defaultValue={min_price.toString()}
                      onEndEditing={applyMinPrice}
                      onChangeText={setMinPrice}
                      returnKeyType={'done'}
                    />
                  </Item>
                  <Item style={styles.rangeItem}>
                    <Label>{t('feed.filters.to')}</Label>
                    <Input
                      style={styles.inputTextColor}
                      keyboardType="numeric"
                      defaultValue={max_price.toString()}
                      onEndEditing={applyMaxPrice}
                      onChangeText={setMaxPrice}
                      returnKeyType={'done'}
                    />
                  </Item>
                </View>
              </>
            )}

            {!!pickerOpts && pickerOpts.sort(positionSorter).map(mapper)}
          </Form>
        </KeyboardAwareScrollView>
        {submitButton}
      </SafeAreaView>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    categoriesLoaded: state.settings.categories.length > 0,
    category_id: state.filters.category_id,
    min_price: state.filters.min_price,
    max_price: state.filters.max_price,
    filtersPresent: Object.values(state.filters).filter((f) => f.length > 0).length > 0,
    currentCategory: state.settings.categories.filter((c) => c.id == state.filters.category_id)[0],
    categoriesValues: state.settings.categories?.map((c) => {
      return { name: c.name, id: c.id };
    }),
    modalVisible: state.feed.modalOpened,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchModalVisible: () => dispatch({ type: ActionTypes.FILTER_MODAL_SWITCH_VISIBILITY }),
    filterReset: () => dispatch(resetFilters()),
    applyFilter: (filterKey, filterValue) => dispatch(applyFilter(filterKey, filterValue)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);

FiltersModal.propTypes = {};
