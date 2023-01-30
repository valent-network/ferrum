import React from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text, Thumbnail } from 'native-base';
import { activeColor, lightColor, primaryColor } from 'colors';

import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';

export default class Notification extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      message: '',
      onPress: null,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onBodyPress = this.onBodyPress.bind(this);

    this.timeout = null;
    this.timeoutConst = 5000;

    this.animatedPosition = new Animated.Value(-100);
  }

  show({ message, timeout, onPress }) {
    const timeoutValue = timeout ? timeout : this.timeoutConst;

    this.setState({ show: true, message, onPress });

    Animated.timing(this.animatedPosition, {
      toValue: 25,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (timeout !== 0) {
      this.timeout = setTimeout(this.hide, timeoutValue);
    }
  }

  hide() {
    Animated.timing(this.animatedPosition, {
      toValue: -100,
      duration: 200,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ show: false });
      }
    });
    clearTimeout(this.timeout);
  }

  onBodyPress() {
    const { onPress } = this.state;

    if (onPress) {
      onPress();
    }
    this.hide();
  }

  render() {
    const { show, message } = this.state;
    const text = message.message ? message.message : message;

    if (!show) {
      return null;
    }

    return (
      <FlingGestureHandler direction={Directions.UP} onHandlerStateChange={this.hide}>
        <Animated.View style={[styles.notificationWrapper, { top: this.animatedPosition }]}>
          <TouchableOpacity activeOpacity={1} onPress={this.onBodyPress} style={styles.notificationBody}>
            {message.photo && <Thumbnail style={styles.messagePhoto} source={{ uri: message.photo }} />}
            <Text numberOfLines={3} style={styles.notificationBodyText}>
              {message.title && (
                <Text style={styles.lightColor}>
                  {message.title}
                  {'\n'}
                </Text>
              )}
              {message.name && (
                <Text style={styles.lightColor}>
                  {message.name}
                  {'\n'}
                </Text>
              )}
              {!!text && typeof text === 'string' && text.toString().replace(/\n/g, ' ')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </FlingGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  notificationWrapper: {
    marginTop: 20,
    position: 'absolute',
    backgroundColor: activeColor,
    zIndex: 100000,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: primaryColor,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  notificationBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  notificationBodyText: {
    color: lightColor,
    fontSize: 14,
    flex: 1,
  },
  close: {
    color: lightColor,
    fontSize: 18,
  },
  messagePhoto: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  lightColor: {
    color: lightColor,
  },
});
