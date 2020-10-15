import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Fab, Icon } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './feedActions';
import { loadAd } from '../actions/adsActions';
import * as ActionTypes from '../actions/actionTypes';

import FeedFilters from './FeedFilters';
import PermissionsBox from './PermissionsBox';

import { activeColor,mainColor } from '../Colors';

class FeedScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return({ header: () => null, title: 'Лента' });
  }

  onAdOpened = (ad) => {
    const { navigation, loadAdDispatched } = this.props;
    navigation.push('Ad', { id: ad.id });
  }

  render() {
    const { ads, loadMoreAdsDispatched, filters, isLoading, onRefreshDispatched, switchModalVisibleDispatched } = this.props;
    const filtersPresent = Object.values(filters).filter(f => f.length > 0).length > 0;

    return (
      <Container>
        <FeedFilters />
        <PermissionsBox />
        <AdsList ads={ads}
                 isLoading={isLoading}
                 onRefresh={onRefreshDispatched}
                 loadMoreAdsDispatched={loadMoreAdsDispatched}
                 onAdOpened={this.onAdOpened}/>
        <Fab direction="left" active={true} position="bottomRight" onPress={switchModalVisibleDispatched} style={styles.fabContainer}>
          <Icon name={filtersPresent ? 'funnel' : 'funnel-outline'} style={styles.fabIcon} />
        </Fab>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.feed.ads,
    isLoading: state.feed.isLoading,
    filters: state.filters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAdsDispatched: () => dispatch(loadMoreAds()),
    loadAdDispatched: (id) => dispatch(loadAd(id)),
    onRefreshDispatched: () => dispatch(getAll()),
    switchModalVisibleDispatched: () => dispatch({type: ActionTypes.FILTER_MODAL_SWITCH_VISIBILITY}),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);

const styles = StyleSheet.create({
  fabIcon: {
    color: '#c9c9c9'
  },
  fabContainer: {
    backgroundColor: activeColor
  }
});
