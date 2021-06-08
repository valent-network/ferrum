import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, H1, View, Icon } from 'native-base';

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

import { setWizardDone } from '../actions/sessionsActions';

import { activeColor, lightColor, darkColor } from '../Colors';

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
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Icon name="people-circle-outline" style={styles.icon} />
          <Content contentContainerStyle={styles.contentContainer}>
            <H1 style={styles.h1}>Постройте свою сеть друзей в Рекарио</H1>

            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>
                🌀 Поделитесь контактами с Рекарио, чтобы узнать всех друзей и знакомых, кто продает автомобиль или знает
                продавца
              </Text>
              <Text style={styles.textBlock}>
                🤫 Контакты будут под защитой, никто, кроме ваших друзей не узнает, кто там есть. И совсем никто не узнает,
                под каким именем он записан
              </Text>
              <Text style={styles.textBlock}>
                ✅ В любой момент можно полностью удалить все контакты с серверов Рекарио
              </Text>
            </View>

            <Button block dark onPress={this.requestContacts} style={styles.goButton}>
              <Text>Предоставить доступ</Text>
            </Button>
            <Button transparent block onPress={this.goTo} style={styles.skipButton}>
              <Text style={styles.mainColor}>Пропустить</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsRequestScreen);

ContactsRequestScreen.propTypes = {};

const styles = StyleSheet.create({
  h1: {
    padding: 24,
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
