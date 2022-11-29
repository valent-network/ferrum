import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Icon, ActionSheet } from 'native-base';
import { withTranslation } from 'react-i18next';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './favoriteAdsActions';
import { loadAd } from '../actions/adsActions';

import { activeColor, primaryColor, secondaryColor } from '../Colors';

class FavoriteAdsScreen extends React.PureComponent {
  onAdOpened = (ad) => {
    const { navigation, loadAd } = this.props;
    navigation.navigate('FavorteAdScreen', { id: ad.id });
  };

  showChangeStarredScreen = () => {
    const { t } = this.props;

    return ActionSheet.show(
      {
        options: [t('ads.visited'), t('ads.myAds'), t('actions.cancel')],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.props.navigation.navigate('VisitedAdsScreen');
          case 1:
            return this.props.navigation.navigate('MyAdsScreen');
        }
      },
    )
  }

  render() {
    const { t, ads, loadMoreAds, isLoading, onRefresh } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <Header style={styles.header} noShadow={true} iosBarStyle="light-content">
          <Body>
            <Title onPress={this.showChangeStarredScreen} style={styles.headerTitle}>
              {t('ads.favorite')}&nbsp;
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
    ads: state.favoriteAds.list,
    isLoading: state.favoriteAds.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    loadAd: (id) => dispatch(loadAd(id)),
    onRefresh: (id, nav) => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FavoriteAdsScreen));

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
