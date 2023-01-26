import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState, Linking } from 'react-native';

import { Container, Content, Spinner } from 'native-base';

import Navigation from 'services/Navigation';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import App from 'navigation/App';
import Login from 'navigation/Login';
import Wizard from 'navigation/Wizard';

import * as ActionTypes from 'actions/types';

import { setWizardDone } from 'actions/sessions';
import { tryUpdateContacts } from 'actions/phoneContacts';
import { getAll as getUserContacts } from 'actions/userContacts';
import { getAll as getFeed } from 'actions/feed';
import { getAll as getMyAds } from 'actions/myAds';
import { getAll as getVisitedAds } from 'actions/visitedAds';
import { getAll as getFavoriteAds } from 'actions/favoriteAds';
import { getProfile } from 'actions/profile';
import { getSettings } from 'actions/settings';

import { getChatRooms, newMessage, readUpdate, deleteMessageFinished, updateUnread } from 'actions/chat';

import { activeColor, spinnerColor } from 'colors';

import { getCachedLocale, getAccessToken, getWizardDone, getPushToken } from 'services/AsyncStorage';

import API from 'services/API';
import { serverChannel } from 'services/ServerChannel';

import Notification from 'services/Notification';

import i18n from 'services/i18n';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wizardLoading: true };

    new Notification(this.onNotification.bind(this));
  }

  appRef = (navigatorRef) => Navigation.setTopLevelNavigator(navigatorRef);

  handleDeepLink(e) {
    const route = e.url.replace(/.*?:\/\//g, '');
    // console.warn(route);
  }

  pushNotificationRouter = (notification) => {
    switch (notification.data.notification_action) {
      case 'open_chat_room':
        this.openChatRoom(notification.data.chat_room_id);
        break;
      default:
        console.warn(notification);
    }
  };

  openChatRoom(chatRoomId) {
    // if (this.props.currentChatId?.toString() != chatRoomId.toString()) {
    //   setTimeout(() => Navigation.navigate('ChatRoomScreen', {chatRoomId}), 500);
    // }

    if (this.props.currentChatId?.toString() != chatRoomId.toString()) {
      setTimeout(() => Navigation.navigate('ChatRoomScreen', { chatRoomId }), 500);
    }
  }

  iOsNotificationHandler(notification) {
    if (notification.userInteraction == true) {
      this.pushNotificationRouter(notification);
    }

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
    const { accessToken, tryUpdateContacts, getChatRooms, getProfile, getSettings } = this.props;

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

    tryUpdateContacts();
    getChatRooms();
    getProfile();
    getSettings();
  };

  refreshAndPopualteApp = () => {
    const { getFeed, getContacts, getMyAds, getVisitedAds, getFavoriteAds } = this.props;

    this.refreshApp();

    getPushToken().then((pushToken) => {
      API.updateProfile({}, JSON.parse(pushToken));
    });

    getFeed();
    getContacts();
    getMyAds();
    getVisitedAds();
    getFavoriteAds();
  };

  async componentDidMount() {
    const { accessToken, setCachedToken, setWizardDone } = this.props;

    let t;

    await getAccessToken().then((token) => {
      t = token || accessToken;
      setCachedToken(t);
    });

    if (Platform.OS === 'android') {
      await getCachedLocale().then((locale) => {
        i18n.changeLanguage(locale);
        API.changeLanguage(locale);
      });
    }

    AppState.addEventListener('change', this.refreshApp);

    getWizardDone().then((done) => {
      if (!!done) {
        setWizardDone();
      }
      this.setState({ wizardLoading: false });
    });

    if (t) {
      this.refreshAndPopualteApp();
    }

    Linking.addEventListener('url', this.handleDeepLink);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.refreshApp);
    serverChannel.disconnect();
    Linking.removeEventListener('url', this.handleDeepLink);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { accessToken } = this.props;

    if (prevProps.accessToken !== accessToken && typeof accessToken !== 'undefined') {
      this.refreshAndPopualteApp();
    }
  }

  render() {
    const { isLoading, accessToken, wizardDone } = this.props;

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
      return <App uriPrefix="recarioapp://" ref={this.appRef} />;
    } else {
      return wizardDone ? <Login /> : <Wizard />;
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
    getSettings: () => dispatch(getSettings()),
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
