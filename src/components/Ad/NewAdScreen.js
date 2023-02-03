import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'native-base';

import { View, Platform } from 'react-native';

import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';

import AdForm from './Form/AdForm';

import { createAd } from 'actions/ads';

import { defaultValues } from './Form/helpers';

import { secondaryColor, simpleColor } from 'colors';

import i18n from 'services/i18n';

const NewAdScreen = ({ onSubmit, navigation, citiesByRegion, categories, isLoading }) => {
  const form = (
    <AdForm
      citiesByRegion={citiesByRegion}
      categories={categories}
      onSubmit={onSubmit}
      isLoading={isLoading}
      newRecord={true}
      defaultValues={defaultValues}
    />
  );
  const handleRightSwap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      navigation.navigate('FeedScreen');
    }
  };
  if (Platform.OS === 'android') {
    return form;
  } else {
    return (
      <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={handleRightSwap}>
        <View style={{ minHeight: '100%' }}>{form}</View>
      </FlingGestureHandler>
    );
  }
};

NewAdScreen.navigationOptions = ({ navigation }) => {
  const goBack = () => navigation.navigate('FeedScreen');

  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTintColor: simpleColor,
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
