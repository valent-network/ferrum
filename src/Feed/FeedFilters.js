import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Switch,
  Platform
} from 'react-native';
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
  Form,
  Label,
  Content,
  Left,
  Right,
  Fab
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { applyFilter, resetFilters } from './feedActions';

import CSS from '../Styles';

const FeedFilters = (props) => {
  let typingTimer;
  const { filters, filtersValues, applyFilterDispatched, filterResetDispatched } = props;
  const [contactModeModalVisible, setContactModeModalVisible] = useState(false);

  const openContactsModeModal = () => setContactModeModalVisible(true);
  const closeContactsModeModal = () => setContactModeModalVisible(false);

  const filterBox = (filterValue, filterType) => {
    const isActive = filters[filterType].filter(f => f === filterValue).length;
    const maybeActiveStyle = { backgroundColor: (isActive ? CSS.activeColor : '#333') };

    return <View key={filterValue} style={[styles.filterBox, maybeActiveStyle]}>
      <Text onPress={() => applyFilterDispatched(filterType, filterValue)}>
        {filterValue}
        &nbsp;
        <Icon name={(filters[filterType].filter(f => f === filterValue)).length ? 'checkmark-circle-outline' : 'ellipse-outline'} style={styles.filterItem} />
      </Text>
    </View>
  }

  const filterBoxWheels = (filterValue) => filterBox(filterValue, 'wheels');
  const filterBoxGears = (filterValue) => filterBox(filterValue, 'gears');
  const filterBoxCarcasses = (filterValue) => filterBox(filterValue, 'carcasses');
  const filterBoxFuels = (filterValue) => filterBox(filterValue, 'fuels');

  const filtersPresent = Object.values(filters).filter(f => f.length > 0).length > 0;

  const onChangeQueryWithDelay = (text) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => applyFilterDispatched('query', text), 200);
  }

  const onContactsModeChange = () => {
    const valueToSet = filters.contacts_mode == 'directFriends' ? '' : 'directFriends';

    applyFilterDispatched('contacts_mode', valueToSet);
  }

  const filterQueryResetDispatched = () => {
    applyFilterDispatched('query', '');
  }

  return (
    <View>
      {Platform.OS === 'android' &&
        <Fab direction="right" position="topRight" style={{top: 48, zIndex: 100, backgroundColor: CSS.activeColor}}>
          <Icon name='funnel-outline' onPress={openContactsModeModal} />
        </Fab>
      }
      <Header style={styles.mainHeader} iosBarStyle={'light-content'} searchBar rounded>
        <Item style={{borderRadius: 8, backgroundColor: '#111', marginTop: (Platform.OS === 'android' ? 16 : 0)}}>
          <Icon name='ios-search' style={{color: CSS.activeColor}}/>
          <Input placeholder='Марка или модель...' style={styles.activeColor} onChangeText={onChangeQueryWithDelay} defaultValue={filters.query}/>
          {filters.query.length > 0 && <Icon name='close-circle-outline' style={styles.activeColor} onPress={filterQueryResetDispatched} />}
        </Item>
        {Platform.OS == 'ios' && <Button transparent>
          <Icon name={filtersPresent ? 'funnel' : 'funnel-outline'} style={styles.activeColor} onPress={openContactsModeModal}/>
        </Button>}

      </Header>

      <Modal animationType='slide' visible={contactModeModalVisible}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAwareScrollView>
            <View style={styles.modalContainer}>
              <Content>
                <Icon name='close-outline' onPress={closeContactsModeModal} style={styles.closeIcon}/>
                <Item style={{borderBottomWidth: 0, marginTop: 12}}>
                  <Left><H1>Фильтры</H1></Left>
                  <Right>
                    {filtersPresent && <Text onPress={filterResetDispatched}>Сбросить</Text>}
                  </Right>
                </Item>

                <Form style={{paddingBottom: 96}}>
                 <H2 style={styles.filterTitle}>Цена, $</H2>
                 <View style={styles.rangeItemWrapper}>
                   <Item floatingLabel style={styles.rangeItem}>
                    <Label>от</Label>
                    <Input keyboardType='numeric' defaultValue={filters.min_price.toString()} onEndEditing={(event) => applyFilterDispatched('min_price', event.nativeEvent.text)}/>
                   </Item>
                   <Item floatingLabel style={styles.rangeItem}>
                    <Label>до</Label>
                    <Input keyboardType='numeric' defaultValue={filters.max_price.toString()} onEndEditing={(event) => applyFilterDispatched('max_price', event.nativeEvent.text)}/>
                   </Item>
                  </View>
                  <H2 style={styles.filterTitle}>Год</H2>
                  <View style={styles.rangeItemWrapper}>
                    <Item floatingLabel style={styles.rangeItem}>
                      <Label>от</Label>
                      <Input keyboardType='numeric' defaultValue={filters.min_year.toString()} onEndEditing={(event) => applyFilterDispatched('min_year', event.nativeEvent.text)}/>
                    </Item>
                    <Item floatingLabel style={styles.rangeItem}>
                      <Label>до</Label>
                      <Input keyboardType='numeric' defaultValue={filters.max_year.toString()} onEndEditing={(event) => applyFilterDispatched('max_year', event.nativeEvent.text)}/>
                    </Item>
                  </View>

                   <H2 style={styles.filterTitle}>Двигатель</H2>
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                     {filtersValues.fuels.map(filterBoxFuels)}
                   </ScrollView>

                   <H2 style={styles.filterTitle}>Коробка передач</H2>
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                     {filtersValues.gears.map(filterBoxGears)}
                   </ScrollView>

                   <H2 style={styles.filterTitle}>Привод</H2>
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                     {filtersValues.wheels.map(filterBoxWheels)}
                   </ScrollView>

                   <H2 style={styles.filterTitle}>Кузов</H2>
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                     {filtersValues.carcasses.map(filterBoxCarcasses)}
                   </ScrollView>

                   <View style={styles.switchFilter}>
                     <Left><H2 style={styles.filterTitle}>Только друзья</H2></Left>
                     <Right>
                       <Switch onValueChange={onContactsModeChange} value={filters.contacts_mode == 'directFriends'} />
                     </Right>
                   </View>

                </Form>
              </Content>
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.submitButtonWrapper} >
            <Button block onPress={closeContactsModeModal} style={{ backgroundColor: CSS.activeColor }}><Text>Поиск</Text></Button>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );

}

function mapStateToProps(state) {
  return {
    filters: state.filters,
    filtersValues: state.filtersValues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterResetDispatched: () => dispatch(resetFilters()),
    filterQueryResetDispatched: () => dispatch(resetFilters()),
    applyFilterDispatched: (filterKey, filterValue) => dispatch(applyFilter(filterKey, filterValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedFilters);

FeedFilters.propTypes = {
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#333',
    flex: 1,
    padding: 16
  },
  mainHeader: {
    backgroundColor: CSS.mainColor,
    borderBottomWidth: 0,
    paddingBottom: 16
  },
  filterTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 16
  },
  filterBox: {
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 2,
    marginRight: 12,
    padding: 6,
    flexDirection: 'row',
    backgroundColor: '#333'
  },
  activeColor: {
    color: CSS.activeColor
  },
  rangeItem: {
    width: '40%'
  },
  rangeItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  filterItem: {
    fontSize: 18,
  },
  safeArea: {
    backgroundColor: '#333',
    minHeight: '100%'
  },
  submitButtonWrapper: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    padding: 16,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    color: CSS.activeColor
  },
  switchFilter: {
    flexDirection: 'row',
    marginTop: 12
  }
});
