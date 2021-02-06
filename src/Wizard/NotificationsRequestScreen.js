import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Container, Content, Text, Button, H1, View, Icon } from 'native-base';

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';

import { setWizardDone } from '../actions/sessionsActions';

import { activeColor, lightColor, darkColor } from '../Colors';

class NotificationsRequestScreen extends React.PureComponent {
  nextStep = () => {
    this.props.setWizardDone();
  };

  requestPushNotifications = () => {
    PushNotification.requestPermissions().then((result) => {
      this.nextStep();
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Icon name="notifications-outline" style={styles.icon} />
          <Content contentContainerStyle={styles.contentContainer}>
            <H1 style={styles.h1}>Оповещения</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>Моментально узнавай самое важное.</Text>
              <Text style={styles.textBlock}>Рекарио постарается не отвлекать по пустякам!</Text>
            </View>
            <Button block dark onPress={this.requestPushNotifications} style={styles.goButton}>
              <Text>Предоставить доступ</Text>
            </Button>
            <Button transparent block onPress={this.nextStep} style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Пропустить</Text>
            </Button>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setWizardDone: () => dispatch(setWizardDone()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsRequestScreen);

NotificationsRequestScreen.propTypes = {};

const styles = StyleSheet.create({
  h1: {
    padding: 24,
    textAlign: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },
  textBlock: {
    marginBottom: 24,
  },
  goButton: {
    backgroundColor: activeColor,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12,
  },
  skipButton: {
    margin: 24,
    marginTop: 0,
    marginBottom: 48,
  },
  skipButtonText: {
    color: lightColor,
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: darkColor,
  },
  icon: {
    alignSelf: 'center',
    color: activeColor,
    fontSize: 48,
  },
});
