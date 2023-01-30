import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';

import { withTranslation } from 'react-i18next';

import { setWizardDone } from 'actions/sessions';

import PICTURE from 'assets/wizard-notifications.gif';

import styles from './styles';

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
            <Text style={styles.goButtonText}>{t('wizzard.notificationsSubmit')}</Text>
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
