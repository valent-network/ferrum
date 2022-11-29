import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';

import { withTranslation } from 'react-i18next';

import { setWizardDone } from '../actions/sessionsActions';

import { activeColor, lightColor, primaryColor, disabledColor } from '../Colors';

import PICTURE from '../assets/wizard3.png';

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
    const { t } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Content contentContainerStyle={styles.contentContainer}>
            <Image style={styles.picture} source={PICTURE} />
            <H1 style={styles.h1}>{t('wizzard.notificationsH1')}</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>{t('wizzard.notificationsPros1')}</Text>
            </View>
          </Content>
          <Button block dark onPress={this.requestPushNotifications} style={styles.goButton}>
            <Text style={styles.goButtonText}>{t('wizzard.contactsSubmit')}</Text>
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NotificationsRequestScreen));

NotificationsRequestScreen.propTypes = {};

const styles = StyleSheet.create({
  h1: {
    textAlign: 'left',
    paddingHorizontal: 16,
    fontWeight: 'bold',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  textBlock: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 24,
    color: disabledColor,
  },
  goButton: {
    backgroundColor: activeColor,
    marginHorizontal: 24,
    marginVertical: 16,
    padding: 24,
    height: 64,
    borderRadius: 32,
  },
  goButtonText: {
    fontWeight: 'bold',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  icon: {
    alignSelf: 'center',
    color: activeColor,
    fontSize: 48,
  },
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '25%',
    marginBottom: '10%',
    width: 200,
    height: 200,
  },
});
