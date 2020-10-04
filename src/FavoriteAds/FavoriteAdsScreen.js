import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Body, Title, Icon, ActionSheet } from 'native-base';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './favoriteAdsActions';
import { loadAd } from '../actions/adsActions';

import CSS from '../Styles';

class FavoriteAdsScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return({ title: 'Избранные', headerShown: false });
  }

  onAdOpened = (ad) => {
    const { navigation, loadAdDispatched } = this.props;
    navigation.navigate('FavorteAdScreen', { id: ad.id });
  }

  showChangeStarredScreen = () => ActionSheet.show(
    {
      options: ['Просмотренные', 'Мои объявления', 'Отменить'],
      cancelButtonIndex: 2,
    },
    buttonIndex => {
      switch(buttonIndex) {
        case 0: return this.props.navigation.navigate('VisitedAdsScreen')
        case 1: return this.props.navigation.navigate('MyAdsScreen')
      }
    }
  )

  render() {
    const { ads, loadMoreAdsDispatched, isLoading, onRefreshDispatched } = this.props;

    return (
      <Container>
        <Header style={{backgroundColor: CSS.mainColor}} iosBarStyle={"light-content"}>
          <Body>
            <Title onPress={this.showChangeStarredScreen}  style={{color: CSS.activeColor}}>
              Избранные&nbsp;
              <Icon name="chevron-down-outline" style={{fontSize: 18, color: CSS.activeColor}}/>
            </Title>
          </Body>
        </Header>
        {<AdsList ads={ads}
                  isLoading={isLoading}
                  onRefresh={onRefreshDispatched}
                  loadMoreAdsDispatched={loadMoreAdsDispatched}
                  onAdOpened={this.onAdOpened}/>}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.favoriteAds.list,
    isLoading: state.favoriteAds.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAdsDispatched: () => dispatch(loadMoreAds()),
    loadAdDispatched: (id) => dispatch(loadAd(id)),
    onRefreshDispatched: (id, nav) => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteAdsScreen);