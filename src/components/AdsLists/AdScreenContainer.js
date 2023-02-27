import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AdScreen from 'components/Ad/AdScreen';

import { loadAdToAdsLists, deleteAd, archiveAd, unarchiveAd } from 'actions/ads';
import { likeAd, unlikeAd } from 'actions/favoriteAds';

import * as ActionTypes from 'actions/types';

class AdScreenContainer extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { headerShown: false };
  };

  onRefresh = () => {
    const { ad, navigation, loadAd } = this.props;

    loadAd(ad.id);
  };

  componentDidMount() {
    const { ad, loadAd, isLoading, navigation, shouldNotReset, shouldPopToTopOnFocus } = this.props;

    shouldNotReset();

    if (isLoading || shouldPopToTopOnFocus) return;

    if (parseInt(ad.id) == parseInt(navigation.state.params.id)) return;

    loadAd(navigation.state.params.id);
  }

  componentDidUpdate() {
    const { navigation, shouldPopToTopOnFocus } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      if (shouldPopToTopOnFocus) {
        navigation.popToTop();
        // shouldNotReset();
      }
    });

    // if (isLoading || shouldPopToTopOnFocus) return;

    // if (parseInt(ad.id) == parseInt(navigation.state.params.id)) return;

    // loadAd(navigation.state.params.id);
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  render() {
    const {
      ad,
      currentAdFriends,
      navigation,
      askFriendsIsLoading,
      isLoading,
      likeAd,
      unlikeAd,
      deleteAd,
      archiveAd,
      unarchiveAd,
      actionsLoading,
      newAdLoading,
    } = this.props;

    const shouldReset = parseInt(ad.id) != parseInt(navigation.state.params.id);

    return (
      <AdScreen
        ad={ad}
        likeAd={likeAd}
        unlikeAd={unlikeAd}
        deleteAd={deleteAd}
        archiveAd={archiveAd}
        unarchiveAd={unarchiveAd}
        currentAdFriends={currentAdFriends}
        askFriendsIsLoading={shouldReset || askFriendsIsLoading}
        isLoading={shouldReset || isLoading}
        actionsLoading={actionsLoading}
        onRefresh={this.onRefresh}
        newAdLoading={newAdLoading}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ad: state.adsListsAd.currentAd,
    isLoading: state.adsListsAd.isLoading,
    askFriendsIsLoading: state.adsListsAd.askFriendsIsLoading,
    currentAdFriends: state.adsListsAd.currentAdFriends,
    actionsLoading: state.adsListsAd.currentAd.actionsLoading,
    shouldPopToTopOnFocus: state.adsListsAd.shouldReset,
    newAdLoading: ownProps.navigation.state.params.id !== state.adsListsAd.currentAd?.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAd: (id) => dispatch(loadAdToAdsLists(id)),
    likeAd: (adId) => dispatch(likeAd(adId)),
    unlikeAd: (adId) => dispatch(unlikeAd(adId)),
    deleteAd: (adId) => dispatch(deleteAd(adId)),
    archiveAd: (adId) => dispatch(archiveAd(adId)),
    unarchiveAd: (adId) => dispatch(unarchiveAd(adId)),
    shouldNotReset: (adId) => dispatch({ type: ActionTypes.REMOVE_RESET_ADS_LISTS_AD }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdScreenContainer);
