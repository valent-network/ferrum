import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from 'react-native';

import { Container, Content, Spinner } from 'native-base';

import PushNotification from 'react-native-push-notification';

import NavigationService from './services/NavigationService';

import AppNavigator from './navigation/AppNavigator';
import LoginNavigator from './navigation/LoginNavigator';
import WizardNavigator from './navigation/WizardNavigator';

import * as ActionTypes from './actions/actionTypes';

import { pushNotificationsSetup } from './actions/pushNotificationsActions';
import { setWizardDone } from './actions/sessionsActions';
import { tryUpdateContacts } from './actions/userContactsActions';
import { checkPermissions } from './actions/pushNotificationsActions';
import { getAll as getUserContacts } from './UserContacts/userContactsActions';
import { getAll as getFeed, updateFilterValues } from './Feed/feedActions';
import { getAll as getMyAds } from './MyAds/myAdsActions';
import { getAll as getVisitedAds } from './VisitedAds/visitedAdsActions';
import { getAll as getFavoriteAds } from './FavoriteAds/favoriteAdsActions';
import { getProfile } from './Profile/profileActions';

import { activeColor } from './Colors';

import { getAccessToken, getWizardDone } from './AsyncStorage';

import API from './services/API';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wizardLoading: true };
  }

  refreshApp = () => {
    if (!(AppState.currentState === 'active')) return;
    const {
      accessToken,
      getContactsDispatched,
      getFeedDispatched,
      getMyAdsDispatched,
      getVisitedAdsDispatched,
      getFavoriteAdsDispatched,
      getProfileDispatched,
      tryUpdateContactsDispatched,
      updateFilterValuesDispatched,
    } = this.props;

    if (accessToken) {

      PushNotification.checkPermissions(permissions => {
        if (permissions.alert || permissions.badge || permissions.sound) {
          pushNotificationsSetup();
        }
      });

      updateFilterValuesDispatched();
      getContactsDispatched();
      // getFeedDispatched();
      getMyAdsDispatched();
      getVisitedAdsDispatched();
      getFavoriteAdsDispatched();
      getProfileDispatched();
      tryUpdateContactsDispatched();
    }
  };

  async componentDidMount() {
    const { accessToken, setCachedToken, getFeedDispatched } = this.props;

    await getAccessToken().then(token => { setCachedToken(token || accessToken) });

    this.refreshApp();
    getFeedDispatched();
    AppState.addEventListener('change', this.refreshApp);

    getWizardDone().then(done => {
      if (!!done) { this.props.setWizardDoneDispatched(); }
      this.setState({ wizardLoading: false });
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.refreshApp);
  }

  render() {
    const { isLoading, accessToken, wizardDone, getFeedDispatched } = this.props;

    if (isLoading || this.state.wizardLoading) {
      return (
        <Container>
          <Content>
            <Spinner color={activeColor} />
          </Content>
        </Container>
      );
    }

    if (accessToken) {
      this.refreshApp();
      getFeedDispatched();
      return <AppNavigator uriPrefix="recarioapp://"
                                  ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}}/>;
    } else {
      return wizardDone ? <LoginNavigator /> : <WizardNavigator />;
    }
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    wizardDone: state.auth.wizardDone,
    isLoading: state.auth.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCachedToken: token => {
      API.setAccessToken(token);
      dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, token: token });
    },
    getContactsDispatched: () => dispatch(getUserContacts()),
    getFeedDispatched: () => dispatch(getFeed()),
    getMyAdsDispatched: () => dispatch(getMyAds()),
    getVisitedAdsDispatched: () => dispatch(getVisitedAds()),
    getFavoriteAdsDispatched: () => dispatch(getFavoriteAds()),
    getProfileDispatched: () => dispatch(getProfile()),
    setWizardDoneDispatched: () => dispatch(setWizardDone()),
    tryUpdateContactsDispatched: () => dispatch(tryUpdateContacts()),
    updateFilterValuesDispatched: () => dispatch(updateFilterValues()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
  setCachedToken: PropTypes.func.isRequired,
  wizardDone: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
};
