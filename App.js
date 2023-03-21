import React from 'react';

import codePush from 'react-native-code-push';

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   const ReactRedux = require('react-redux');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     onlyLogs: false,
//     collapseGroups: true,
//     exclude: [/^VirtualizedList/],
//     trackExtraHooks: [[ReactRedux, 'useSelector']],
//     // notifier: ({Component, displayName, hookName, prevProps, prevState, prevHook, nextProps, nextState, nextHook, reason, options, ownerDataMap}) => console.log(`<${displayName} /> ${prevProps} --- ${nextProps} [${reason}]`)
//   });
// }

import { View, StyleSheet, StatusBar, Appearance } from 'react-native';

import { Root as NativeBaseRoot, StyleProvider } from 'native-base';

import { Provider } from 'react-redux';

import { store } from 'store';

import { notification } from 'utils';

import Notification from 'components/Notification';

import Root from 'components/Root';

import { darkColor, textColor, primaryColor } from 'colors';

// console.disableYellowBox = true;

const App = () => {
    const notificationRef = (ref) => (notification.ref = ref);

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle={Appearance.getColorScheme() === 'light' ? "dark-content" : "light-content"} />
        <Notification ref={notificationRef} />
        <Provider store={store}>
          <NativeBaseRoot>
            <Root />
          </NativeBaseRoot>
        </Provider>
      </View>
    );
  }

// TODO: Adjust Codepush to new Appcenter workflow
// export default codePush(App);

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: primaryColor,
  },
});
