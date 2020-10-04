import React from 'react';

import PropTypes from 'prop-types';
import { Container, Text, Button, H1, View } from 'native-base';

import CSS from '../Styles';

export default class HelloScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('ContactsRequestScreen');
  };

  render() {
    return (
      <Container>
        <H1
          style={{
            marginTop: 96,
            paddingLeft: 24,
            paddingRight: 24,
            textAlign: 'center',
          }}>
          Доброе пожаловать в Рекарио!
        </H1>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            paddingLeft: 24,
            paddingRight: 24,
          }}>
          <Text style={{ marginBottom: 24 }}>Следите за объявлениями о продаже машин от ваших друзей.</Text>
          <Text style={{ marginBottom: 24 }}>Узнайте, кто из ваших друзей может знать других продавцов.</Text>
          <Text style={{ marginBottom: 24 }}>
            Чем больше ваших друзей и друзей их друзей зарегистрируются в Рекарио – тем больше шанс получить реальную
            рекомендацию о продавце интересующего автомобиля.
          </Text>
        </View>
        <Button block onPress={this.nextStep} style={{ margin: 24, marginTop: 0, marginBottom: 48 }}>
          <Text>Продолжить</Text>
        </Button>
      </Container>
    );
  }
}

HelloScreen.propTypes = {};
