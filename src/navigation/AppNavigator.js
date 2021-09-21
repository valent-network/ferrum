import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import AdScreen from '../Ad/AdScreen';
import UserContactsScreen from '../UserContacts/UserContactsScreen';
import ProfileScreen from '../Profile/ProfileScreen';
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

import { darkColor, activeColor, appearanceBgColor, disabledColor, menuItemColor } from '../Colors';

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
    return <Icon name={iconName} style={tintColor === disabledColor ? styles.inactiveIcon : styles.activeIcon} />;
  };
}

const defaultNavigationOptions = {
  cardStyle: {
    backgroundColor: darkColor,
  },
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
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileNavigator = createStackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen },
    InviteFriendsScreen: { screen: InviteFriendsScreen },
  },
  {
    initialRouteName: 'ProfileScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const UserContactsNavigator = createStackNavigator(
  {
    UserContactsScreen: { screen: UserContactsScreen },
  },
  {
    initialRouteName: 'UserContactsScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const StarredNavigator = createSwitchNavigator(
  {
    visited: createStackNavigator({
      VisitedAdsScreen: { screen: VisitedAdsScreen, path: '' },
      VisitedAdScreen: { screen: StarredAdScreen, path: 'ads/:id' },
    }),
    Favorites: createStackNavigator({
      FavoriteAdsScreen,
      FavorteAdScreen: { screen: StarredAdScreen },
    }),
    My: createStackNavigator({
      MyAdsScreen,
      MyAdScreen: { screen: StarredAdScreen },
    }),
  },
  {
    initialRouteName: 'Favorites',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const bottomTabsNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedNavigator,
      path: 'feed',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('search-outline'),
      },
    },
    VisitedAds: {
      screen: StarredNavigator,
      path: '',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('star-outline'),
      },
    },
    Chat: {
      screen: ChatStack,
      path: '',
      navigationOptions: {
        title: '',
        tabBarIcon: (props) => <ChatIcon {...props} />,
      },
    },
    UserContacts: {
      screen: UserContactsNavigator,
      path: 'user_contacts',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('people-circle-outline'),
      },
    },
    Profile: {
      screen: ProfileNavigator,
      path: 'profile',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('settings-outline'),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: appearanceBgColor,
        borderTopWidth: 1,
        borderTopColor: menuItemColor,
        height: 64,
        paddingTop: 4,
      },
      activeTintColor: activeColor,
      inactiveTintColor: disabledColor,
    },
  },
);

export default createAppContainer(bottomTabsNavigator);
