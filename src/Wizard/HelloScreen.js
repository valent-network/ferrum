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
          <Icon name="fitness-outline" style={styles.icon} />
          <Content contentContainerStyle={styles.contentContainer}>
            <H1 style={styles.h1}>Держи руку на пульсе с Рекарио</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>Узнай, кто из друзей сейчас продает автомобиль.</Text>
              <Text style={styles.textBlock}>Найди общих друзей с продавцом.</Text>
              <Text style={styles.textBlock}>
                Предложи друзьям установить Рекарио и узнай еще больше об интересных машинах и их владельцах!
              </Text>
            </View>
            <Button block dark onPress={this.nextStep} style={styles.goButton}>
              <Text>Продолжить</Text>
            </Button>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

HelloScreen.propTypes = {};

const styles = StyleSheet.create({
  h1: {
    padding: 24,
    textAlign: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  textBlock: {
    marginBottom: 24,
  },
  goButton: {
    backgroundColor: activeColor,
    margin: 24,
    marginTop: 0,
    marginBottom: 48,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
