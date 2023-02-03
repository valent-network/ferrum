import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import AdForm from './Form/AdForm';

import { updateAd } from 'actions/ads';
import { simpleColor, secondaryColor } from 'colors';
import i18n from 'services/i18n';

const EditAdScreen = ({ navigation, onSubmit, citiesByRegion, categories, isLoading }) => {
  const params = navigation.state.params;
  const ad = {
    id: params.ad.id,
    price: params.ad.price.replace(/\s/g, ''),
    options: params.ad.translated_options,
    title: params.ad.title,
    short_description: params.ad.short_description,
    description: params.ad.description,
    city_id: params.ad.city_id,
    category_id: params.ad.category_id,
    region: params.ad.region,
    ad_images: params.ad.images,
    native: params.ad.native,
  };

  return (
    <AdForm
      citiesByRegion={citiesByRegion}
      categories={categories}
      onSubmit={onSubmit}
      isLoading={isLoading}
      newRecord={false}
      defaultValues={ad}
    />
  );
};

function mapStateToProps(state) {
  return {
    citiesByRegion: state.settings.citiesByRegion,
    categories: state.settings.categories,
    isLoading: state.myAds.isUpdating,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data, resetForm) => dispatch(updateAd(data, resetForm)),
  };
}

EditAdScreen.navigationOptions = ({ navigation }) => {
  return {
    headerShown: true,
    headerTitleStyle: { color: simpleColor },
    headerTintColor: simpleColor,
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    title: navigation.state.params.ad.title,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAdScreen);
