import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Icon, ActionSheet } from 'native-base';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './visitedAdsActions';
import { loadAd } from '../actions/adsActions';

import { activeColor } from '../Colors';

class VisitedAdsScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { headerShown: false };
  };

  onAdOpened = (ad) => {
    const { navigation, loadAd } = this.props;
    navigation.navigate('VisitedAdScreen', { id: ad.id });
  };

  showChangeStarredScreen = () =>
    ActionSheet.show(
      {
        options: ['Избранные', 'Мои объявления', 'Отменить'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.props.navigation.navigate('FavoriteAdsScreen');
          case 1:
            return this.props.navigation.navigate('MyAdsScreen');
        }
      },
    );

  render() {
    const { ads, loadMoreAds, isLoading, onRefresh } = this.props;

    // if (ads.length === 0 && isLoading) { return <Container><Content></Content></Container> }

    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content" noShadow={true}>
          <Body>
            <Title onPress={this.showChangeStarredScreen} style={styles.headerTitle}>
              Просмотренные&nbsp;
              <Icon name="chevron-down-outline" style={styles.headerIcon} />
            </Title>
          </Body>
        </Header>
        {
          <AdsList
            ads={ads}
            isLoading={isLoading}
            onRefresh={onRefresh}
            loadMoreAds={loadMoreAds}
            onAdOpened={this.onAdOpened}
          />
        }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.visitedAds.list,
    isLoading: state.visitedAds.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    loadAd: (id) => dispatch(loadAd(id)),
    onRefresh: (id, nav) => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitedAdsScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerIcon: {
    fontSize: 18,
    color: activeColor,
  },
  headerTitle: {
    color: activeColor,
  },
});
