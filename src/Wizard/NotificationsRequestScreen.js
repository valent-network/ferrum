import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Container, Text, Button, H1, View } from 'native-base';

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';

import { setWizardDone } from '../actions/sessionsActions';

import { activeColor } from '../Colors';

class NotificationsRequestScreen extends React.PureComponent {
  nextStep = () => {
    this.props.setWizardDone();
  };

  requestPushNotifications = () => {
    PushNotification.requestPermissions().then(result => {
      this.nextStep();
    });
  }

  render() {
    return (
      <Container>
        <H1
          style={{
            marginTop: 94,
            paddingLeft: 24,
            paddingRight: 24,
            textAlign: 'center',
          }}>
          Оповещения
        </H1>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            paddingLeft: 24,
            paddingRight: 24,
          }}>
          <Text style={{ marginBottom: 24 }}>
            Получайте оперативные обновления о новых объявлениях друзей и много другого.
          </Text>
        </View>
        <Button
          block
          dark
          onPress={this.requestPushNotifications}
          style={{backgroundColor: activeColor, marginLeft: 24, marginRight: 24, marginBottom: 12 }}>
          <Text>Предоставить доступ</Text>
        </Button>
        <Button transparent block onPress={this.nextStep} style={{ margin: 24, marginTop: 0, marginBottom: 48 }}>
          <Text style={{ color: '#fff' }}>Пропустить</Text>
        </Button>
      </Container>
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
