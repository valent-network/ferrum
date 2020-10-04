import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoginContainer from '../Login/LoginContainer';

const LoginNavigator = createSwitchNavigator({
  LoginContainer,
});

export default createAppContainer(LoginNavigator);
