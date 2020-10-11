import React from 'react';

import codePush from "react-native-code-push";

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    onlyLogs: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  });
}

import { View as SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';

import { Root as NativeBaseRoot, StyleProvider } from 'native-base';

import { Provider } from 'react-redux';

import { store } from './src/store';

import { notification } from './src/Utils';

import Notification from './src/Notification';

import Root from './src/Root';

import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

import { darkColor } from './src/Colors';

class App extends React.PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />
        <Notification ref={ref => (notification.ref = ref)} />
        <Provider store={store}>
          <NativeBaseRoot>
            <StyleProvider style={getTheme(platform)}>
              <Root />
            </StyleProvider>
          </NativeBaseRoot>
        </Provider>
      </SafeAreaView>
    );
  }
}

export default codePush(App);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: darkColor,
  },
});
