import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Container, Content, Text, Button, H1, View, Icon } from 'native-base';

import { activeColor, darkColor } from '../Colors';

export default class HelloScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('ContactsRequestScreen');
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Content>
            <Icon name="fitness-outline" style={styles.icon} />
            <H1 style={styles.h1}>Держите руку на пульсе с Рекарио</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>Узнайте, кто из друзей сейчас продаёт автомобиль</Text>
            </View>
          </Content>
          <Button block dark onPress={this.nextStep} style={styles.goButton}>
            <Text>Продолжить</Text>
          </Button>
        </Container>
      </SafeAreaView>
    );
  }
}

HelloScreen.propTypes = {};

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
    fontSize: 48,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 24,
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
