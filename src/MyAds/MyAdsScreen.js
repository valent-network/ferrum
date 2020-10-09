import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Content, Header, Body, Title, Icon, ActionSheet } from 'native-base';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './myAdsActions';
import { loadAd } from '../actions/adsActions';

import CSS from '../Styles';

class MyAdsScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return({ title: 'Мои объявления', headerShown: false });
  }

  onAdOpened = (ad) => {
    const { navigation, loadAdDispatched } = this.props;
    navigation.push('MyAdScreen', { id: ad.id });
  }

  showChangeStarredScreen = () => ActionSheet.show(
    {
      options: ['Просмотренные', 'Избранные', 'Отменить'],
      cancelButtonIndex: 2,
    },
    buttonIndex => {
      switch(buttonIndex) {
        case 0: return this.props.navigation.navigate('VisitedAdsScreen')
        case 1: return this.props.navigation.navigate('FavoriteAdsScreen')
      }
    }
  )

  render() {
    const { ads, loadMoreAdsDispatched, isLoading, onRefreshDispatched } = this.props;

    if (ads.length === 0 && isLoading) { return <Container><Content></Content></Container> }

    return (
      <Container>
        <Header style={{backgroundColor: CSS.mainColor, borderBottomWidth: 0}} iosBarStyle={"light-content"}>
          <Body>
            <Title onPress={this.showChangeStarredScreen} style={{color: CSS.activeColor}}>
              Мои объявления&nbsp;
              <Icon name="chevron-down-outline" style={{fontSize: 18, color: CSS.activeColor}} />
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
    ads: state.myAds.list,
    isLoading: state.myAds.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAdsDispatched: () => dispatch(loadMoreAds()),
    loadAdDispatched: (id) => dispatch(loadAd(id)),
    onRefreshDispatched: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAdsScreen);