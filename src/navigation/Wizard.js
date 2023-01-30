import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BuyScreen from 'components/Wizard/BuyScreen';
import SellScreen from 'components/Wizard/SellScreen';
import ConnectScreen from 'components/Wizard/ConnectScreen';
import ContactsRequestScreen from 'components/Wizard/ContactsRequestScreen';
import NotificationsRequestScreen from 'components/Wizard/NotificationsRequestScreen';

const WizardNavigator = createStackNavigator(
  {
    BuyScreen,
    SellScreen,
    ConnectScreen,
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
