import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HelloScreen from 'components/Wizard/HelloScreen';
import ContactsRequestScreen from 'components/Wizard/ContactsRequestScreen';
import NotificationsRequestScreen from 'components/Wizard/NotificationsRequestScreen';

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
