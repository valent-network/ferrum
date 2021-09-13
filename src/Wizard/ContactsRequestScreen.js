import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

import { setWizardDone } from '../actions/sessionsActions';

import { activeColor, lightColor, darkColor, disabledColor } from '../Colors';

import PICTURE from '../assets/wizard2.png';

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
          <Content contentContainerStyle={styles.contentContainer}>
            <Image style={styles.picture} source={PICTURE} />
            <H1 style={styles.h1}>Соберите своих друзей в Рекарио</H1>

            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>
                Мы будем периодически загружать вашу контактную книгу на свои сервера
              </Text>
              <Text style={styles.textBlock}>
                Это нужно для того, чтобы показывать объявления ваших друзей и знакомых
              </Text>
              <Text style={styles.textBlock}>
                Вы в любой момент можете полностью удалить свои данные с наших серверов
              </Text>
            </View>
          </Content>
          <Button block dark onPress={this.requestContacts} style={styles.goButton}>
            <Text style={styles.goButtonText}>Продолжить</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsRequestScreen);

ContactsRequestScreen.propTypes = {};

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
    backgroundColor: darkColor,
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
  },
});
