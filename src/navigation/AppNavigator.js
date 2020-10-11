import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Icon } from 'native-base';

import AdScreen from '../Ad/AdScreen';
import UserContactsScreen from '../UserContacts/UserContactsScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import FeedScreen from '../Feed/FeedScreen';
import FeedAdScreen from '../Feed/AdScreenContainer';
import MyAdsScreen from '../MyAds/MyAdsScreen';
import VisitedAdsScreen from '../VisitedAds/VisitedAdsScreen';
import FavoriteAdsScreen from '../FavoriteAds/FavoriteAdsScreen';

import StarredAdScreen from '../Starred/AdScreenContainer';

import { darkColor, activeColor } from '../Colors';

function iconFor(iconName) {
  return ({ tintColor }) => <Icon name={iconName} style={{fontSize: 24, color: tintColor}} />
}

const defaultNavigationOptions = {
}

const FeedNavigator = createStackNavigator(
  {
    FeedScreen: { screen: FeedScreen },
    Ad: { screen: FeedAdScreen },
  },
  {
    initialRouteName: 'FeedScreen',
    defaultNavigationOptions: defaultNavigationOptions
  },
);

const ProfileNavigator = createStackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen }
  },
  {
    initialRouteName: 'ProfileScreen',
    defaultNavigationOptions: defaultNavigationOptions
  },
);

const UserContactsNavigator = createStackNavigator(
  {
    UserContactsScreen: { screen: UserContactsScreen }
  },
  {
    initialRouteName: 'UserContactsScreen',
    defaultNavigationOptions: defaultNavigationOptions
  },
);


const StarredNavigator = createSwitchNavigator(
  {
    visited: createStackNavigator({
      VisitedAdsScreen: { screen: VisitedAdsScreen, path: '' },
      VisitedAdScreen: { screen: StarredAdScreen, path: 'ads/:id' }
    }),
    Favorites: createStackNavigator({
      FavoriteAdsScreen,
      FavorteAdScreen: { screen: StarredAdScreen }
    }),
    My: createStackNavigator({
      MyAdsScreen,
      MyAdScreen: { screen: StarredAdScreen }
    }),
  },
  {
    initialRouteName: 'Favorites',
    defaultNavigationOptions: defaultNavigationOptions
  },
);

const bottomTabsNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedNavigator,
      path: 'feed',
      navigationOptions: {
        title: 'Поиск',
        tabBarIcon: iconFor('search-outline')
      }
    },
    VisitedAds: {
      screen: StarredNavigator,
      path: '',
      navigationOptions: {
        title: 'Закладки',
        tabBarIcon: iconFor('star-outline')
      }
    },
    UserContacts: {
      screen: UserContactsNavigator,
      path: 'user_contacts',
      navigationOptions: {
        title: 'Друзья',
        tabBarIcon: iconFor('people-circle-outline')
      }
    },
    Profile: {
      screen: ProfileNavigator,
      path: 'profile',
      navigationOptions: {
        title: 'Настройки',
        tabBarIcon: iconFor('settings-outline')
      }
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: darkColor,
        borderTopWidth: 0,
        marginBottom: 12,
      },
      activeTintColor: activeColor,
      inactiveTintColor: 'grey'
    }
  }
);

export default createAppContainer(bottomTabsNavigator);
