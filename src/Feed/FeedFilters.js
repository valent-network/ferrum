import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Modal, SafeAreaView, Switch, Platform, TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  Header,
  Item,
  ListItem,
  Icon,
  Input,
  Button,
  H1,
  H2,
  H3,
  Form,
  Label,
  Content,
  Left,
  Right,
  Body,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from "react-i18next";

import NavigationService from '../services/NavigationService';

import ChatIcon from '../navigation/ChatIcon';

import * as ActionTypes from '../actions/actionTypes';

import { applyFilter, resetFilters } from './feedActions';

import { activeColor, trackColor, primaryColor, lightColor, disabledColor, secondaryColor } from '../Colors';

const FeedFilters = ({ filters, filtersValues, applyFilter, filterReset, modalVisible, switchModalVisible }) => {
  const { t } = useTranslation();

  let typingTimer;

  const filterQueryReset = useCallback(() => applyFilter('query', ''), []);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);

  const filterResetWithLocal = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setMinYear(null);
    setMaxYear(null);
    filterReset();
  };

  const applyFilterLocally = (key, value) => {
    switch (key) {
      case 'min_price':
        setMinPrice(value);
        break;
      case 'max_price':
        setMaxPrice(value);
        break;
      case 'min_year':
        setMinYear(value);
        break;
      case 'max_year':
        setMaxYear(value);
        break;
    }
  };

  const switchModalVisibleWithLocal = () => {
    if (minPrice) {
      applyFilter('min_price', minPrice);
    }
    if (maxPrice) {
      applyFilter('max_price', maxPrice);
    }
    if (minYear) {
      applyFilter('min_year', minYear);
    }
    if (maxYear) {
      applyFilter('max_year', maxYear);
    }
    switchModalVisible();
  };

  const filterBox = (filterValue, filterType) => {
    const isActive = filters[filterType].filter((f) => f === filterValue).length;
    const maybeActiveStyle = { backgroundColor: isActive ? activeColor : disabledColor };
    const iconName = filters[filterType].filter((f) => f === filterValue).length
      ? 'checkmark-circle-outline'
      : 'ellipse-outline';

    return (
      <View key={filterValue} style={isActive ? styles.activeFilterBox : styles.filterBox}>
        <Text onPress={() => applyFilter(filterType, filterValue)} style={styles.filterBoxText}>
          {filterValue}
          &nbsp;
          <Icon name={iconName} style={styles.filterItem} />
        </Text>
      </View>
    );
  };

  const filterBoxWheels = (filterValue) => filterBox(filterValue, 'wheels');
  const filterBoxGears = (filterValue) => filterBox(filterValue, 'gears');
  const filterBoxCarcasses = (filterValue) => filterBox(filterValue, 'carcasses');
  const filterBoxFuels = (filterValue) => filterBox(filterValue, 'fuels');
  const filterBoxHopsCount = (filterValue, index) => filterBox(filterValue, 'hops_count');

  const filtersPresent = Object.values(filters).filter((f) => f.length > 0).length > 0;

  const onChangeQueryWithDelay = (text) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => applyFilter('query', text), 200);
  };

  return (
    <View>
      <Header style={styles.mainHeader} iosBarStyle="light-content" noShadow={true} searchBar rounded>
        <TouchableOpacity activeOpacity={1} onPress={switchModalVisible}>
          <Left style={styles.topIconContainer}>
            <Icon name={filtersPresent ? 'funnel' : 'funnel-outline'} style={styles.filterIcon} />
          </Left>
        </TouchableOpacity>
        <Item style={styles.searchBar}>
          <Icon name="ios-search" style={styles.searchIcon} />
          <Input
            placeholder={t('feed.search.placeholder')}
            placeholderTextColor={disabledColor}
            style={styles.inputTextColor}
            onChangeText={onChangeQueryWithDelay}
            defaultValue={filters.query}
            returnKeyType={'done'}
          />
          {filters.query.length > 0 && (
            <Icon name="close-circle" style={styles.inputTextColor} onPress={filterQueryReset} />
          )}
        </Item>
        <TouchableOpacity activeOpacity={1} onPress={() => NavigationService.navigate('ChatRoomsListScreen')}>
          <Right style={styles.topIconContainer}>
            <ChatIcon />
          </Right>
        </TouchableOpacity>
      </Header>

      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always" bounces={false} extraHeight={296}>
            <View style={styles.modalContainer}>
              <Content>
                <View style={styles.modalControlsContainer}>
                  <H1 style={styles.filtersHeader}>{t('feed.filters.headers.main')}</H1>
                  {filtersPresent && (
                    <H3 onPress={filterResetWithLocal} style={styles.resetControl}>
                      {t('feed.filters.headers.reset')}
                    </H3>
                  )}
                  <Icon name="close-outline" onPress={switchModalVisibleWithLocal} style={styles.closeIcon} />
                </View>
                <Form style={styles.filtersForm}>
                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.knowThrough')}</H2>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {filtersValues.hops_count.map(filterBoxHopsCount)}
                  </ScrollView>
                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.price')}</H2>
                  <View style={styles.rangeItemWrapper}>
                    <Item style={styles.rangeItem}>
                      <Label>{t('feed.filters.from')}</Label>
                      <Input
                        style={styles.inputTextColor}
                        keyboardType="numeric"
                        defaultValue={filters.min_price.toString()}
                        onEndEditing={(event) => applyFilter('min_price', event.nativeEvent.text)}
                        onChangeText={(value) => applyFilterLocally('min_price', value)}
                        returnKeyType={'done'}
                      />
                    </Item>
                    <Item style={styles.rangeItem}>
                      <Label>{t('feed.filters.to')}</Label>
                      <Input
                        style={styles.inputTextColor}
                        keyboardType="numeric"
                        defaultValue={filters.max_price.toString()}
                        onEndEditing={(event) => applyFilter('max_price', event.nativeEvent.text)}
                        onChangeText={(value) => applyFilterLocally('max_price', value)}
                        returnKeyType={'done'}
                      />
                    </Item>
                  </View>
                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.year')}</H2>
                  <View style={styles.rangeItemWrapper}>
                    <Item style={styles.rangeItem}>
                      <Label>{t('feed.filters.from')}</Label>
                      <Input
                        style={styles.inputTextColor}
                        keyboardType="numeric"
                        defaultValue={filters.min_year.toString()}
                        onEndEditing={(event) => applyFilter('min_year', event.nativeEvent.text)}
                        onChangeText={(value) => applyFilterLocally('min_year', value)}
                        returnKeyType={'done'}
                      />
                    </Item>
                    <Item style={styles.rangeItem}>
                      <Label>{t('feed.filters.to')}</Label>
                      <Input
                        style={styles.inputTextColor}
                        keyboardType="numeric"
                        defaultValue={filters.max_year.toString()}
                        onEndEditing={(event) => applyFilter('max_year', event.nativeEvent.text)}
                        onChangeText={(value) => applyFilterLocally('max_year', value)}
                        returnKeyType={'done'}
                      />
                    </Item>
                  </View>

                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.engine')}</H2>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {filtersValues.fuels.map(filterBoxFuels)}
                  </ScrollView>

                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.gears')}</H2>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {filtersValues.gears.map(filterBoxGears)}
                  </ScrollView>

                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.wheels')}</H2>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {filtersValues.wheels.map(filterBoxWheels)}
                  </ScrollView>

                  <H2 style={styles.filterTitle}>{t('feed.filters.headers.carcass')}</H2>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {filtersValues.carcasses.map(filterBoxCarcasses)}
                  </ScrollView>

                  <View style={styles.submitButtonWrapper}>
                    <Button block onPress={switchModalVisibleWithLocal} style={styles.submitButton}>
                      <Text>{t('feed.filters.submit')}</Text>
                    </Button>
                  </View>
                </Form>
              </Content>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
    filtersValues: state.filtersValues,
    modalVisible: state.feed.modalOpened,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchModalVisible: () => dispatch({ type: ActionTypes.FILTER_MODAL_SWITCH_VISIBILITY }),
    filterReset: () => dispatch(resetFilters()),
    filterQueryReset: () => dispatch(resetFilters()),
    applyFilter: (filterKey, filterValue) => dispatch(applyFilter(filterKey, filterValue)),
    switchModalVisible: () => dispatch({ type: ActionTypes.FILTER_MODAL_SWITCH_VISIBILITY }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedFilters);

FeedFilters.propTypes = {};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: primaryColor,
    flex: 1,
    padding: 16,
  },
  modalControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
  },
  closeIcon: {
    color: lightColor,
    fontSize: 48,
    fontWeight: 'bold',
    height: 48,
  },
  resetControl: {
    color: lightColor,
    alignSelf: 'center',
    fontSize: 14,
  },
  filtersHeader: {
    borderBottomWidth: 0,
    alignSelf: 'center',
  },
  mainHeader: {
    backgroundColor: secondaryColor,
    flexWrap: 'nowrap',
    borderBottomWidth: 0,
    paddingBottom: 8,
  },
  filterTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterBox: {
    borderColor: activeColor,
    borderWidth: 0.2,
    borderRadius: 2,
    marginRight: 12,
    padding: 6,
    flexDirection: 'row',
    backgroundColor: secondaryColor,
  },
  filterBoxText: {
    color: lightColor,
  },
  activeFilterBox: {
    borderColor: lightColor,
    borderWidth: 1,
    borderRadius: 2,
    marginRight: 12,
    padding: 6,
    flexDirection: 'row',
    backgroundColor: activeColor,
  },
  activeColor: {
    color: activeColor,
  },
  rangeItem: {
    width: '40%',
  },
  rangeItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  filterItem: {
    fontSize: 18,
    color: lightColor,
  },
  safeArea: {
    backgroundColor: primaryColor,
    minHeight: '100%',
  },
  submitButtonWrapper: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
  },
  submitButton: {
    backgroundColor: activeColor,
  },
  switchFilter: {
    flexDirection: 'row',
    marginTop: 12,
  },
  searchBar: {
    borderRadius: 16,
    backgroundColor: primaryColor,
    marginTop: Platform.OS === 'android' ? 32 : 0,
    alignSelf: Platform.OS === 'android' ? 'flex-end' : 'center',
  },
  searchIcon: {
    color: disabledColor,
  },
  filtersForm: {
    paddingBottom: 96,
  },
  inputTextColor: {
    color: lightColor,
  },
  topIconContainer: {
    height: '100%',
    minWidth: 57,
    maxWidth: 57,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 57,
    maxHeight: 57,
  },
  filterIcon: {
    color: disabledColor,
    fontSize: 24,
    color: activeColor,
  },
});
