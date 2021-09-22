import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';

import { activeColor, disabledColor, appearanceBgColor } from '../Colors';

import PICTURE from '../assets/wizard1.png';

export default class HelloScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('ContactsRequestScreen');
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Content>
            <Image style={styles.picture} source={PICTURE} />
            <H1 style={styles.h1}>Держите руку на пульсе с Рекарио</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>Узнайте, кто из друзей сейчас продаёт автомобиль</Text>
              <Text style={styles.textBlock}>
                Попросите рекомендацию друга о конкретном объявлении — он может знать продавца
              </Text>
              <Text style={styles.textBlock}>Помогайте друзьям находить машины мечты</Text>
            </View>
          </Content>
          <Button block dark onPress={this.nextStep} style={styles.goButton}>
            <Text style={styles.goButtonText}>Продолжить</Text>
          </Button>
        </Container>
      </SafeAreaView>
    );
  }
}

HelloScreen.propTypes = {};

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
    backgroundColor: appearanceBgColor,
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
