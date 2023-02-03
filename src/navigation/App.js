import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import AdScreen from 'components/Ad/AdScreen';
import NewAdScreen from 'components/Ad/NewAdScreen';
import EditAdScreen from 'components/Ad/EditAdScreen';
import UserContactsScreen from 'components/UserContacts/UserContactsScreen';
import ProfileScreen from 'components/Profile/ProfileScreen';
import LanguageScreen from 'components/Profile/LanguageScreen';
import InviteFriendsScreen from 'components/Profile/InviteFriendsScreen';
import FeedScreen from 'components/Feed/FeedScreen';
import FeedAdScreen from 'components/Feed/AdScreenContainer';
import ChatRoomScreen from 'components/Chat/ChatRoomScreen';
import ChatRoomSettingsScreen from 'components/Chat/ChatRoomSettingsScreen';
import ChatRoomsListScreen from 'components/Chat/ChatRoomsListScreen';
import AdsListsAdScreen from 'components/AdsLists/AdScreenContainer';
import AdsListsScreen from 'components/AdsLists/AdsListsScreen';
import BottomTabChatIcon from 'components/BottomTabChatIcon';
import BottomTabIcon from 'components/BottomTabIcon';

import { activeColor, primaryColor, disabledColor, secondaryColor, superActiveColor, simpleColor } from 'colors';

const defaultNavigationOptions = {
  cardStyle: {
    backgroundColor: primaryColor,
  },
};

const ChatNavigator = createStackNavigator(
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

ChatNavigator.navigationOptions = ({ navigation }) => {
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
    FeedScreen: { screen: FeedScreen, path: '' },
    FeedAd: { screen: FeedAdScreen, path: '' },
  },
  {
    initialRouteName: 'FeedScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);
const NewAdNavigator = createStackNavigator(
  {
    NewAdScreen: {
      screen: NewAdScreen,
      path: '',
    },
  },
  {
    initialRouteName: 'NewAdScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const UserContactsNavigator = createStackNavigator(
  {
    UserContactsScreen: { screen: UserContactsScreen, navigationOptions: { headerShown: false }, path: '' },
  },
  {
    initialRouteName: 'UserContactsScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  },
);

const ProfileNavigator = createStackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen, navigationOptions: { headerShown: false }, path: '' },
    InviteFriendsScreen: { screen: InviteFriendsScreen, path: '' },
    LanguageScreen: {
      screen: LanguageScreen,
      path: '',
    },
    UserContacts: {
      screen: UserContactsNavigator,
      path: '',
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

const AdsListsNavigator = createStackNavigator(
  {
    AdsLists: { screen: AdsListsScreen, navigationOptions: { headerShown: false }, path: '' },
    Ad: { screen: AdsListsAdScreen, path: 'ads/:id' },
    EditAdScreen: { screen: EditAdScreen, path: '' },
  },
  {
    initialRouteName: 'AdsLists',
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
        tabBarIcon: ({ tintColor }) => <BottomTabIcon name="search" tintColor={tintColor} />,
      },
    },
    AdsLists: {
      screen: AdsListsNavigator,
      path: 'visited',
      navigationOptions: {
        title: '',
        tabBarIcon: ({ tintColor }) => <BottomTabIcon name="bookmarks" tintColor={tintColor} />,
      },
    },
    CreateAd: {
      screen: NewAdNavigator,
      path: 'createAd',
      navigationOptions: {
        title: '',
        tabBarIcon: ({ tintColor }) => <BottomTabIcon name="add-circle-sharp" tintColor={tintColor} />,
        tabBarVisible: false,
      },
    },
    Chat: {
      screen: ChatNavigator,
      path: '',
      navigationOptions: {
        title: '',
        tabBarIcon: ({ tintColor }) => <BottomTabChatIcon tintColor={tintColor} />,
      },
    },
    Profile: {
      screen: ProfileNavigator,
      path: 'profile',
      navigationOptions: {
        title: '',
        tabBarIcon: ({ tintColor }) => <BottomTabIcon name="person-circle-outline" tintColor={tintColor} />,
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
      inactiveTintColor: simpleColor,
    },
  },
);

export default createAppContainer(bottomTabsNavigator);
