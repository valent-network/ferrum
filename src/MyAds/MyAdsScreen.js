import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Icon, ActionSheet } from 'native-base';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './myAdsActions';
import { loadAd } from '../actions/adsActions';

import { activeColor, primaryColor, secondaryColor } from '../Colors';

class MyAdsScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { title: 'Мои объявления', headerShown: false };
  };

  onAdOpened = (ad) => {
    const { navigation, loadAd } = this.props;
    navigation.push('MyAdScreen', { id: ad.id });
  };

  showChangeStarredScreen = () =>
    ActionSheet.show(
      {
        options: ['Просмотренные', 'Избранные', 'Отменить'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.props.navigation.navigate('VisitedAdsScreen');
          case 1:
            return this.props.navigation.navigate('FavoriteAdsScreen');
        }
      },
    );

  render() {
    const { ads, loadMoreAds, isLoading, onRefresh } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <Header style={styles.header} iosBarStyle="light-content" noShadow={true}>
          <Body>
            <Title onPress={this.showChangeStarredScreen} style={styles.headerTitle}>
              Мои объявления&nbsp;
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
    ads: state.myAds.list,
    isLoading: state.myAds.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    loadAd: (id) => dispatch(loadAd(id)),
    onRefresh: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAdsScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: secondaryColor,
    borderBottomWidth: 0,
  },
  headerIcon: {
    fontSize: 18,
    color: activeColor,
  },
  headerTitle: {
    color: activeColor,
  },
  mainContainer: {
    backgroundColor: primaryColor,
  },
});
