import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import AdScreen from '../Ad/AdScreen';
import NewAdScreen from '../Ad/NewAdScreen';
import EditAdScreen from '../Ad/EditAdScreen';
import UserContactsScreen from '../UserContacts/UserContactsScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import LanguageScreen from '../Profile/LanguageScreen';
import InviteFriendsScreen from '../Profile/InviteFriendsScreen';
import FeedScreen from '../Feed/FeedScreen';
import FeedAdScreen from '../Feed/AdScreenContainer';
import MyAdsScreen from '../MyAds/MyAdsScreen';
import VisitedAdsScreen from '../VisitedAds/VisitedAdsScreen';
import FavoriteAdsScreen from '../FavoriteAds/FavoriteAdsScreen';

import ChatRoomScreen from '../Chat/ChatRoomScreen';
import ChatRoomSettingsScreen from '../Chat/ChatRoomSettingsScreen';
import ChatRoomsListScreen from '../Chat/ChatRoomsListScreen';

import StarredAdScreen from '../Starred/AdScreenContainer';

import { activeColor, primaryColor, disabledColor, secondaryColor, lightColor } from '../Colors';

import ChatIcon from './ChatIcon';

const styles = StyleSheet.create({
  activeIcon: {
    fontSize: 24,
    color: activeColor,
  },
  inactiveIcon: {
    fontSize: 24,
    color: disabledColor,
  },
});

function iconFor(iconName) {
  return ({ tintColor }) => {
    let style = tintColor === disabledColor ? styles.inactiveIcon : styles.activeIcon
    if (iconName=='add-circle-sharp') { style = [style, {marginTop: -24, fontSize: 54}] };
    return <Icon name={iconName} style={style} />;
  };
}

const defaultNavigationOptions = {
  cardStyle: {
    backgroundColor: primaryColor,
  },
};

const ChatStack = createStackNavigator(
  {
    ChatRoomsListScreen: { screen: ChatRoomsListScreen, path: '' },
    ChatRoomSettingsScreen: { screen: ChatRoomSettingsScreen, path: '' },
    ChatRoomScreen: { screen: ChatRoomScreen, path: 'chat/:id' },
  },
  {
    initialRouteName: 'ChatRoomsListScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  const route = navigation.state.routes[navigation.state.routes.length - 1];

  if (route.routeName === 'ChatRoomScreen') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const FeedNavigator = createStackNavigator(
  {
    FeedScreen: { screen: FeedScreen },
    Ad: { screen: FeedAdScreen },
  },
  {
    initialRouteName: 'FeedScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const UserContactsNavigator = createStackNavigator(
  {
    UserContactsScreen: { screen: UserContactsScreen, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: 'UserContactsScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const ProfileNavigator = createStackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen, navigationOptions: { headerShown: false } },
    InviteFriendsScreen: { screen: InviteFriendsScreen },
    LanguageScreen: {
      screen: LanguageScreen,
    },
    UserContacts: {
      screen: UserContactsNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ProfileScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const StarredNavigator = createAnimatedSwitchNavigator(
  {
    visited: createStackNavigator({
      VisitedAdsScreen: { screen: VisitedAdsScreen, path: '', navigationOptions: {headerShown: false} },
      VisitedAdScreen: { screen: StarredAdScreen, path: 'ads/:id' },
    }),
    Favorites: createStackNavigator({
      FavoriteAdsScreen: { screen: FavoriteAdsScreen, navigationOptions: {headerShown: false} },
      FavoriteAdScreen: { screen: StarredAdScreen },
    }),
    My: createStackNavigator({
      MyAdsScreen: { screen: MyAdsScreen, navigationOptions: {headerShown: false} },
      MyAdScreen: { screen: StarredAdScreen },
      EditAdScreen: { screen: EditAdScreen },
    }),
  },
  {
    initialRouteName: 'Favorites',
    defaultNavigationOptions: defaultNavigationOptions,
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-right"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={200} />
      </Transition.Together>
    )
  },
);

const bottomTabsNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedNavigator,
      path: 'feed',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('search'),
      },
    },
    VisitedAds: {
      screen: StarredNavigator,
      path: '',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('bookmarks'),
      },
    },
    CreateAd: {
      screen: NewAdScreen,
      path: 'createAd',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('add-circle-sharp'),
        tabBarVisible: false,
      },
    },
    Chat: {
      screen: ChatStack,
      path: '',
      navigationOptions: {
        title: '',
        tabBarIcon: ({tintColor}) => <ChatIcon tintColor={tintColor} />,
      },
    },
    Profile: {
      screen: ProfileNavigator,
      path: 'profile',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('menu'),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: primaryColor,
        borderTopWidth: 1,
        borderTopColor: secondaryColor,
        height: 64,
        paddingTop: 4,
      },
      activeTintColor: activeColor,
      inactiveTintColor: disabledColor,
    },
  },
);

export default createAppContainer(bottomTabsNavigator);
