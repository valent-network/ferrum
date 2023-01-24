import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'native-base';

import AdForm from './Form/AdForm';

import { createAd } from 'actions/ads';

import { defaultValues } from './Form/helpers';

import { secondaryColor, lightColor } from 'colors';

import i18n from 'services/i18n';

const NewAdScreen = ({ onSubmit, citiesByRegion, categories, isLoading }) => {
  return (
    <AdForm
      citiesByRegion={citiesByRegion}
      categories={categories}
      onSubmit={onSubmit}
      isLoading={isLoading}
      newRecord={true}
      defaultValues={defaultValues}
    />
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
    headerLeft: () => <Icon name="chevron-back-outline" onPress={goBack} />,
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
