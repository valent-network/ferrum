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
          <Content contentContainerStyle={styles.contentContainer}>
            <Icon name="people-circle-outline" style={styles.icon} />
            <H1 style={styles.h1}>Соберите своих друзей в Рекарио</H1>

            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>
                Рекарио будет периодически загружать вашу контактную книгу на свои сервера.
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
            <Text>Продолжить</Text>
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
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  textBlock: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    width: '100%',
  },
  goButton: {
    backgroundColor: activeColor,
    marginHorizontal: 24,
    marginVertical: 16,
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
