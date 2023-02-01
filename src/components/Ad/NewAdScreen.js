import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'native-base';

import { View, Platform } from 'react-native';

import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';

import AdForm from './Form/AdForm';

import { createAd } from 'actions/ads';

import { defaultValues } from './Form/helpers';

import { secondaryColor, lightColor } from 'colors';

import i18n from 'services/i18n';

import Navigation from 'services/Navigation';

const NewAdScreen = ({ onSubmit, citiesByRegion, categories, isLoading }) => {
  return (
    <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={() => Navigation.navigate('FeedScreen')}>
      <View style={{ minHeight: '100%' }}>
        <AdForm
          citiesByRegion={citiesByRegion}
          categories={categories}
          onSubmit={onSubmit}
          isLoading={isLoading}
          newRecord={true}
          defaultValues={defaultValues}
        />
      </View>
    </FlingGestureHandler>
  );
};

NewAdScreen.navigationOptions = ({ navigation }) => {
  const goBack = () => navigation.navigate('FeedScreen');

  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTintColor: lightColor,
    headerLeft: () => (
      <Icon
        style={{ marginLeft: Platform.OS === 'android' ? 16 : 0 }}
        name={Platform.OS === 'android' ? 'arrow-back-outline' : 'chevron-back-outline'}
        onPress={goBack}
      />
    ),
    title: i18n.t('nav.titles.createAd'),
  };
};

function mapStateToProps(state) {
  return {
    citiesByRegion: state.settings.citiesByRegion,
    categories: state.settings.categories,
    isLoading: state.myAds.isCreating,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data, resetForm) => dispatch(createAd(data, resetForm)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAdScreen);
