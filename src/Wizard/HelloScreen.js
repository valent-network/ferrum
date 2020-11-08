import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';

import { activeColor } from '../Colors';

export default class HelloScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('ContactsRequestScreen');
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <H1 style={styles.h1}> Доброе пожаловать в Рекарио!</H1>
          <View style={styles.mainContainer}>
            <Text style={styles.textBlock}>Следите за объявлениями о продаже машин от ваших друзей.</Text>
            <Text style={styles.textBlock}>Узнайте, кто из ваших друзей может знать других продавцов.</Text>
            <Text style={styles.textBlock}>
              Чем больше ваших друзей и друзей их друзей зарегистрируются в Рекарио – тем больше шанс получить реальную
              рекомендацию о продавце интересующего автомобиля.
            </Text>
          </View>
          <Button block dark onPress={this.nextStep} style={styles.goButton}>
            <Text>Продолжить</Text>
          </Button>
        </Content>
      </Container>
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
});
