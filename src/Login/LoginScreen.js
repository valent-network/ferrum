import React from 'react';
import { StyleSheet, Switch, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Input, Button, Container, Content, Item, Icon, Spinner, View, Left, Right } from 'native-base';

import CSS, { login as styles } from '../Styles';

import { onTosPress } from '../Utils';

export default class LoginScreen extends React.Component {
  onInputPhone = event => this.props.onInputPhone(event.nativeEvent.text);
  onInputCode = event => this.props.onInputCode(event.nativeEvent.text);
  onRequest = () => this.props.onRequest(this.props.phone);
  onSignIn = () => this.props.onSignIn(this.props.phone, this.props.code);
  changeTosAcceptance = () => this.setState({ tosAccespted: !this.state.tosAccespted });

  constructor(props) {
    super(props);
    this.state = { tosAccespted: false };
  }

  render() {
    const { phone, code, step, errors, onRequest, onSignIn, onReset, isLoading } = this.props;

    const requestButton = (
      <Button onPress={this.onRequest} style={styles.button} block disabled={!this.state.tosAccespted}>
        <Text>Получить код</Text>
      </Button>
    );
    const signInButton = (
      <Button onPress={this.onSignIn} style={styles.button} block>
        <Text>Войти</Text>
      </Button>
    );
    const codeInput = (
      <Item style={styles.codeInput} rounded>
        <Icon name="ios-key" style={{color: CSS.activeColor}} />
        <Input
          style={styles.input}
          placeholder="Код"
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          onChange={this.onInputCode}
        />
      </Item>
    );
    const phoneInput = (
      <Item rounded style={{borderRadius: 4, backgroundColor: '#000', borderColor: CSS.activeColor}}>
        <Icon name="ios-phone-portrait" style={{color: CSS.activeColor}} />
        <Text style={styles.phoneCountryText}>+380</Text>
        <Input
          placeholderTextColor="#aaaaaa"
          placeholder="Телефон"
          keyboardType="numeric"
          style={styles.input}
          onChange={this.onInputPhone}
        />
      </Item>
    );
    if (isLoading) {
      return (
        <Container>
          <Content>
            <Spinner color={CSS.activeColor} />
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.mainContainer}>
          {step === 1 ? phoneInput : codeInput}

          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          {errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

          {step === 1 ? requestButton : signInButton}
          {step === 1 && (
            <Item style={{ borderBottomWidth: 0, marginTop: 8 }}>
              <Left>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text onPress={onTosPress} style={{ fontSize: 11 }}>
                    Ознакомлен(а) с{' '}
                  </Text>
                  <Text onPress={onTosPress} style={{ fontSize: 11, color: '#00a8ff' }}>
                    условиями использования
                  </Text>
                </View>
              </Left>
              <Right style={{ flex: 0 }}>
                <Switch thumbColor={'#fff'} trackColor={{true: CSS.activeColor, false: CSS.mainColor}} ios_backgroundColor={CSS.mainColor} onValueChange={this.changeTosAcceptance} value={this.state.tosAccespted} />
              </Right>
            </Item>
          )}

          {step === 2 && (
            <Text onPress={this.onRequest} style={styles.helperActions}>
              Отправить код еще раз
            </Text>
          )}
          {step === 2 && (
            <Text onPress={onReset} style={styles.helperActions}>
              Использовать другой номер телефона
            </Text>
          )}
        </Content>
      </Container>
    );
  }
}

LoginScreen.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  onInputPhone: PropTypes.func.isRequired,
  onInputCode: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
