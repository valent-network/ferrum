import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HelloScreen from '../Wizard/HelloScreen';
import ContactsRequestScreen from '../Wizard/ContactsRequestScreen';
import NotificationsRequestScreen from '../Wizard/NotificationsRequestScreen';

const WizardNavigator = createStackNavigator(
  {
    HelloScreen,
    ContactsRequestScreen,
    NotificationsRequestScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(WizardNavigator);
