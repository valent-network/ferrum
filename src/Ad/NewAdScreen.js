import React from 'react';
import { connect } from 'react-redux';

import AdForm from './Form/AdForm';

import { createAd } from '../actions/adsActions';

import { defaultValues  } from './Form/Helpers';

const NewAdScreen = ({ navigation, onSubmit, citiesByRegion, categories, isLoading }) => {
  const goBack = () => navigation.goBack();

  return <AdForm citiesByRegion={citiesByRegion}
                 categories={categories}
                 navigationGoBack={goBack}
                 onSubmit={onSubmit}
                 isLoading={isLoading}
                 newRecord={true}
                 defaultValues={defaultValues} />
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

