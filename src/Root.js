import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from 'react-native';

import { Container, Content, Spinner } from 'native-base';

import NavigationService from './services/NavigationService';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import AppNavigator from './navigation/AppNavigator';
import LoginNavigator from './navigation/LoginNavigator';
import WizardNavigator from './navigation/WizardNavigator';

import * as ActionTypes from './actions/actionTypes';

import { setWizardDone } from './actions/sessionsActions';
import { tryUpdateContacts } from './actions/userContactsActions';
import { getAll as getUserContacts } from './UserContacts/userContactsActions';
import { getAll as getFeed, updateFilterValues } from './Feed/feedActions';
import { getAll as getMyAds } from './MyAds/myAdsActions';
import { getAll as getVisitedAds } from './VisitedAds/visitedAdsActions';
import { getAll as getFavoriteAds } from './FavoriteAds/favoriteAdsActions';
import { getProfile } from './Profile/profileActions';

import { getChatRooms, newMessage, readUpdate, deleteMessageFinished, updateUnread } from './Chat/chatActions';

import { activeColor, spinnerColor } from './Colors';

import { getAccessToken, getWizardDone, getPushToken } from './AsyncStorage';

import API from './services/API';
import { serverChannel } from './services/ServerChannel';

import NotifService from './pushNotificationsSetup';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wizardLoading: true };

    new NotifService(this.onNotification.bind(this))
  }

  appNavigatorRef = (navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef);

  pushNotificationRouter = (notification) => {
    switch(notification.data.notification_action) {
      case 'open_chat_room':
        this.openChatRoom(notification.data.chat_room_id);
        break;
      default:
        console.warn(notification)
    }
  }

  openChatRoom(chatRoomId) {
    // if (this.props.currentChatId?.toString() != chatRoomId.toString()) {
    //   setTimeout(() => NavigationService.navigate('ChatRoomScreen', {chatRoomId}), 500);
    // }

    if (this.props.currentChatId?.toString() != chatRoomId.toString()) {
      setTimeout(() => NavigationService.navigate('ChatRoomScreen', {chatRoomId}), 500);
    }
  }

  iOsNotificationHandler(notification) {
    this.pushNotificationRouter(notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }

  androidNotificationHandler(notification) {
    if (notification.data) {
      if (notification.userInteraction == true) {
        this.pushNotificationRouter(notification);
      } else {
        if (!notification.foreground) {
          PushNotification.localNotification({
            channelId: 'messages',
            userInfo: notification.data,
            ...notification.data,
          });
        }
      }
    }
  }

  onNotification(notification) {
    Platform.OS === 'ios' ? this.iOsNotificationHandler(notification) : this.androidNotificationHandler(notification);
  }

  onContactsProcessed = () => {
    const { updateContactsFinished, getFeed, getContacts, getProfile } = this.props;

    updateContactsFinished();
    getFeed();
    getContacts();
    getProfile();
  };

  userChannelCallbacks = {
    onContactsProcessed: this.onContactsProcessed,
    onNewMessage: this.props.newMessage,
    onReadUpdate: this.props.readUpdate,
    onUnreadMessage: this.props.updateUnreadMessagesCount,
    onDeleteMessage: this.props.deleteMessage,
  };

  refreshApp = () => {
    const { accessToken, tryUpdateContacts, updateFilterValues, getChatRooms, getProfile, newMessage } = this.props;

    if (AppState.currentState === 'active') {
      if (!accessToken) {
        return;
      }
    } else {
      serverChannel.disconnect();
      return;
    }

    serverChannel.authenticate(accessToken);
    serverChannel.connectToUsersChannel(this.userChannelCallbacks);

    updateFilterValues();
    getChatRooms();
    tryUpdateContacts();
    getProfile();
  };

  async componentDidMount() {
    const { accessToken, setCachedToken, setWizardDone, newMessage } = this.props;

    let t;

    await getAccessToken().then((token) => {
      t = token || accessToken;
      setCachedToken(t);
    });

    AppState.addEventListener('change', this.refreshApp);

    getWizardDone().then((done) => {
      if (!!done) {
        setWizardDone();
      }
      this.setState({ wizardLoading: false });
    });

    serverChannel.authenticate(t);
    serverChannel.connectToUsersChannel(this.userChannelCallbacks);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.refreshApp);
    serverChannel.disconnect();
  }

  render() {
    const {
      isLoading,
      accessToken,
      wizardDone,
      getFeed,
      getContacts,
      getMyAds,
      getVisitedAds,
      getFavoriteAds,
      getProfile,
      getChatRooms,
    } = this.props;

    if (isLoading || this.state.wizardLoading) {
      return (
        <Container>
          <Content>
            <Spinner color={spinnerColor} />
          </Content>
        </Container>
      );
    }

    if (accessToken) {
      this.refreshApp();

      getPushToken().then((pushToken) => {
        API.updateProfile({}, JSON.parse(pushToken));
      });
      getChatRooms();
      getFeed();
      getContacts();
      getMyAds();
      getVisitedAds();
      getFavoriteAds();
      getProfile();

      return <AppNavigator uriPrefix="recarioapp://" ref={this.appNavigatorRef} />;
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
    currentChatId: state.currentChat.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCachedToken: (token) => {
      API.setAccessToken(token);
      dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, token: token });
    },
    getChatRooms: () => dispatch(getChatRooms()),
    getContacts: () => dispatch(getUserContacts()),
    getFeed: () => dispatch(getFeed()),
    getMyAds: () => dispatch(getMyAds()),
    getVisitedAds: () => dispatch(getVisitedAds()),
    getFavoriteAds: () => dispatch(getFavoriteAds()),
    getProfile: () => dispatch(getProfile()),
    setWizardDone: () => dispatch(setWizardDone()),
    tryUpdateContacts: () => dispatch(tryUpdateContacts()),
    updateFilterValues: () => dispatch(updateFilterValues()),
    updateContactsFinished: () => dispatch({ type: ActionTypes.UPDATE_CONTACTS_FINISHED }),
    newMessage: (chat, myMessage) => dispatch(newMessage(chat, myMessage)),
    readUpdate: (chat) => dispatch(readUpdate(chat)),
    updateUnreadMessagesCount: (count) => dispatch(updateUnread(count)),
    deleteMessage: (id, chat_room_id, updated_at) => dispatch(deleteMessageFinished(id, chat_room_id, updated_at)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
  setCachedToken: PropTypes.func.isRequired,
  wizardDone: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
};
