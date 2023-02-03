import React from 'react';

import codePush from 'react-native-code-push';

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   const ReactRedux = require('react-redux');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     onlyLogs: true,
//     trackExtraHooks: [[ReactRedux, 'useSelector']],
//   });
// }

import { View, StyleSheet, StatusBar } from 'react-native';

import { Root as NativeBaseRoot, StyleProvider } from 'native-base';

import { Provider } from 'react-redux';

import { store } from 'store';

import { notification } from 'utils';

import Notification from 'components/Notification';

import Root from 'components/Root';

import getTheme from 'native-base-theme/components';
import nativeBaseThemeVariables from 'native-base-theme/variables/platform';

import { darkColor, simpleColor, primaryColor } from 'colors';

// console.disableYellowBox = true;

const App = () => {
    const notificationRef = (ref) => (notification.ref = ref);
    const themeVariables = {
      ...nativeBaseThemeVariables,
      containerBgColor: primaryColor,
      textColor: simpleColor,
    }
    const theme = getTheme(themeVariables);

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />
        <Notification ref={notificationRef} />
        <Provider store={store}>
          <NativeBaseRoot>
            <StyleProvider style={theme}>
              <Root />
            </StyleProvider>
          </NativeBaseRoot>
        </Provider>
      </View>
    );
  }

export default codePush(App);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: primaryColor,
  },
});
