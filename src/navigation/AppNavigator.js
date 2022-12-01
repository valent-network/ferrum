import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';

import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import AdScreen from '../Ad/AdScreen';
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
  if (iconName === 'garage') {
    return ({ tintColor }) => {
      return (
        <FontAwesomeIcon
          icon={faWarehouse}
          style={tintColor === disabledColor ? styles.inactiveIcon : styles.activeIcon}
          size={24}
        />
      );
    };
  }

  return ({ tintColor }) => {
    return <Icon name={iconName} style={tintColor === disabledColor ? styles.inactiveIcon : styles.activeIcon} />;
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

const FeedNavigator = createStackNavigator(
  {
    FeedScreen: { screen: FeedScreen },
    Ad: { screen: FeedAdScreen },
    Chat: {
      screen: ChatStack,
      path: '',
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'FeedScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

FeedNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  const route = navigation.state.routes[navigation.state.routes.length - 1];

  if (route.routeName === 'Chat') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

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

const StarredNavigator = createSwitchNavigator(
  {
    visited: createStackNavigator({
      VisitedAdsScreen: { screen: VisitedAdsScreen, path: '', navigationOptions: {headerShown: false} },
      VisitedAdScreen: { screen: StarredAdScreen, path: 'ads/:id' },
    }),
    Favorites: createStackNavigator({
      FavoriteAdsScreen: { screen: FavoriteAdsScreen, navigationOptions: {headerShown: false} },
      FavorteAdScreen: { screen: StarredAdScreen },
    }),
    My: createStackNavigator({
      MyAdsScreen: { screen: MyAdsScreen, navigationOptions: {headerShown: false} },
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
        tabBarIcon: iconFor('garage'),
      },
    },
    Profile: {
      screen: ProfileNavigator,
      path: 'profile',
      navigationOptions: {
        title: '',
        tabBarIcon: iconFor('menu-outline'),
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
