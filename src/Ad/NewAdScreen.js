import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'native-base';

import AdForm from './Form/AdForm';

import { createAd } from '../actions/adsActions';

import { defaultValues  } from './Form/Helpers';

import {secondaryColor, lightColor} from '../Colors';

import i18n from '../../i18n';

const NewAdScreen = ({ onSubmit, citiesByRegion, categories, isLoading }) => {

  return <AdForm citiesByRegion={citiesByRegion}
                 categories={categories}
                 onSubmit={onSubmit}
                 isLoading={isLoading}
                 newRecord={true}
                 defaultValues={defaultValues} />
}

NewAdScreen.navigationOptions = ({navigation}) => {
  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTintColor: lightColor,
    headerLeft: () => <Icon name='chevron-back-outline' onPress={() => navigation.navigate('FeedScreen')} />,
    title: i18n.t('nav.titles.createAd'),
  }
}

function mapStateToProps(state) {
  return {
    citiesByRegion: state.settings.citiesByRegion,
    categories: state.settings.categories,
    isLoading: state.myAds.isCreating,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data, resetForm) => dispatch(createAd(data, resetForm))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAdScreen);

