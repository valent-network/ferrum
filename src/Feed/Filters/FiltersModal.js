import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, SafeAreaView } from 'react-native';
import {
  View,
  Text,
  Item,
  Icon,
  Input,
  Button,
  H1,
  H2,
  H3,
  Form,
  Label,
  Content,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from "react-i18next";

import NavigationService from '../../services/NavigationService';

import * as ActionTypes from '../../actions/actionTypes';

import { applyFilter, resetFilters } from '../feedActions';

import styles from './Styles';

import MultiPicker from './MultiPicker';

const FiltersModal = ({ category_id, min_price, max_price, filtersPresent, categoriesValues, currentCategory, applyFilter, filterReset, modalVisible, switchModalVisible }) => {
  const { t } = useTranslation();

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const pickerOpts = currentCategory?.ad_option_types.filter(opt => opt.filterable && opt.input_type == 'picker');
  const categoryOpts = {name: 'category_id', localized_name: t('feed.filters.headers.category'), values: categoriesValues}

  applyMinPrice = (event) => applyFilter('min_price', event.nativeEvent.text);
  applyMaxPrice = (event) => applyFilter('max_price', event.nativeEvent.text);

  const onReset = () => {
    setMinPrice(null);
    setMaxPrice(null);
    filterReset();
  };

  const onClose = () => {
    if (minPrice) { applyFilter('min_price', minPrice) }
    if (maxPrice) { applyFilter('max_price', maxPrice) }
    switchModalVisible();
  };

  const reset = <H3 onPress={onReset} style={styles.resetControl}>{t('feed.filters.headers.reset')}</H3>
  const close = <Icon name="close-outline" onPress={onClose} style={styles.closeIcon} />

  return (
    <Modal animationType="fade" visible={modalVisible}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalControlsContainer}>
          <H1 style={styles.filtersHeader}>{t('feed.filters.headers.main')}</H1>
          {filtersPresent && reset}
          {close}
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" bounces={false} extraHeight={296}>
          <View style={styles.modalContainer}>
            <Content>
              <Form style={styles.filtersForm}>

                {!!categoryOpts && <MultiPicker opt={categoryOpts} />}

                {!!currentCategory && <>
                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.price')}, {currentCategory.currency}</H2>
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
                </>}

                {!!pickerOpts && pickerOpts.sort((a, b) => a.position - b.position).map(opt => <MultiPicker key={`opt-${opt.id}`} opt={opt} />)}
              </Form>
            </Content>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.submitButtonWrapper}>
          <Button block onPress={onClose} style={styles.submitButton}>
            <Text>{t('feed.filters.submit')}</Text>
          </Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    category_id: state.filters.category_id,
    min_price: state.filters.min_price,
    max_price: state.filters.max_price,
    filtersPresent: Object.values(state.filters).filter((f) => f.length > 0).length > 0,
    currentCategory: state.settings.categories.filter(c => c.id == state.filters.category_id)[0],
    categoriesValues: state.settings.categories?.map(c => {return {name: c.name, id: c.id}}),
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

