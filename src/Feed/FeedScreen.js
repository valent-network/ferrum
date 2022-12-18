import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'native-base';

import AdsList from '../AdsList';

import { loadMoreAds, getAll } from './feedActions';
import { loadAd } from '../actions/adsActions';
import * as ActionTypes from '../actions/actionTypes';

import FeedFilters from './FeedFilters';
import PermissionsBox from './PermissionsBox';

import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';

class FeedScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { header: () => null, title: '' };
  };

  onAdOpened = (ad) => {
    const { navigation, loadAd } = this.props;
    navigation.push('Ad', { id: ad.id });
  };

  onSwipeRight = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.props.switchModalVisible()
    }
  }

  onSwipeLeft = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.props.navigation.navigate('ChatRoomsListScreen')
    }
  }

  render() {
    const { ads, loadMoreAds, filters, isLoading, onRefresh } = this.props;

    return (
      <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={this.onSwipeRight.bind(this)}>
        <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={this.onSwipeLeft.bind(this)}>
          <Container>
            <FeedFilters />
            <PermissionsBox />
            <AdsList
              ads={ads}
              isLoading={isLoading}
              onRefresh={onRefresh}
              loadMoreAds={loadMoreAds}
              onAdOpened={this.onAdOpened}
              fromFeed={true}
            />
          </Container>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  }
}

function mapStateToProps(state) {
  return {
    ads: state.feed.ads,
    isLoading: state.feed.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreAds: () => dispatch(loadMoreAds()),
    loadAd: (id) => dispatch(loadAd(id)),
    onRefresh: () => dispatch(getAll()),
    switchModalVisible: () => dispatch({ type: ActionTypes.FILTER_MODAL_SWITCH_VISIBILITY }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
