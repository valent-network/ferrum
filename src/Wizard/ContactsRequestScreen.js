import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Button, H1, View } from 'native-base';

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

import { setWizardDone } from '../actions/sessionsActions';

import { activeColor, lightColor } from '../Colors';

class ContactsRequestScreen extends React.PureComponent {
  goTo = () => {
    const { setWizardDone } = this.props;

    if (Platform.OS == 'ios') {
      this.props.navigation.navigate('NotificationsRequestScreen');
    } else {
      setWizardDone();
    }
  };

  requestContacts = () => {
    var permName = Platform.select({
      android: PERMISSIONS.ANDROID.READ_CONTACTS,
      ios: PERMISSIONS.IOS.CONTACTS,
    });
    return request(permName).then((status) => {
      this.goTo();
    });
  };

  render() {
    return (
      <Container>
        <H1 style={styles.h1}> Доступ к контактам</H1>

        <View style={styles.mainContainer}>
          <Text style={styles.textBlock}>
            Чтобы Рекарио мог подсказать, кто из ваших друзей продает автомобиль или знает одного из продавцов, ему
            нужен доступ к контактной книге.
          </Text>
          <Text style={styles.textBlock}>
            Ваши контакты будут конфиденциальны, никто, кроме ваших друзей не узнает, кто есть у вас в контактах и под
            каким именем.
          </Text>
          <Text style={styles.textBlock}>В любой момент можно полностью удалить все контакты с серверов Рекарио.</Text>
        </View>

        <Button block dark onPress={this.requestContacts} style={styles.goButton}>
          <Text>Предоставить доступ</Text>
        </Button>
        <Button transparent block onPress={this.goTo} style={styles.skipButton}>
          <Text style={styles.mainColor}>Пропустить</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsRequestScreen);

ContactsRequestScreen.propTypes = {};

const styles = StyleSheet.create({
  h1: {
    marginTop: 96,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
  },
  textBlock: {
    marginBottom: 24,
  },
  mainColor: {
    color: lightColor,
  },
  skipButton: {
    margin: 24,
    marginTop: 0,
    marginBottom: 48,
  },
  goButton: {
    backgroundColor: activeColor,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12,
  },
});
