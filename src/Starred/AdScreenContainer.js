import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AdScreen from '../Ad/AdScreen';

import { loadAdToStarred } from '../actions/adsActions';
import { likeAd, unlikeAd } from '../FavoriteAds/favoriteAdsActions';

class AdScreenContainer extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return { headerShown: false };
  };

  onRefresh = () => {
    const { ad, navigation, loadAdDispatched } = this.props;

    loadAdDispatched(ad.id);
  };

  componentDidMount() {
    const { ad, loadAdDispatched, isLoading, navigation } = this.props;

    if (isLoading) return;

    if (parseInt(ad.id) == parseInt(navigation.state.params.id)) return;

    loadAdDispatched(navigation.state.params.id);
  }

  componentDidUpdate() {
    const { ad, loadAdDispatched, isLoading, navigation } = this.props;

    if (isLoading) return;

    if (parseInt(ad.id) == parseInt(navigation.state.params.id)) return;

    loadAdDispatched(navigation.state.params.id);
  }

  render () {
    const { ad, currentAdFriends, askFriendsIsLoading, isLoading, loadAdDispatched, likeAdDispatched, unlikeAdDispatched } = this.props;

    return <AdScreen ad={ad}
                     likeAdDispatched={likeAdDispatched}
                     unlikeAdDispatched={unlikeAdDispatched}
                     currentAdFriends={currentAdFriends}
                     askFriendsIsLoading={askFriendsIsLoading}
                     isLoading={isLoading}
                     onRefresh={this.onRefresh} />
  }
}

function mapStateToProps(state) {
  return {
    ad: state.starredAd.currentAd,
    isLoading: state.starredAd.isLoading,
    askFriendsIsLoading: state.starredAd.askFriendsIsLoading,
    currentAdFriends: state.starredAd.currentAdFriends,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAdDispatched: (id) => dispatch(loadAdToStarred(id)),
    likeAdDispatched: (adId) => dispatch(likeAd(adId)),
    unlikeAdDispatched: (adId) => dispatch(unlikeAd(adId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdScreenContainer);
