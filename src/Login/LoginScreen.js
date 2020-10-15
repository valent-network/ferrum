import React from 'react';
import { StyleSheet, Switch, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Input, Button, Container, Content, Item, Icon, Spinner, View, Left, Right } from 'native-base';

import { darkColor, activeColor, mainColor, trackColor } from '../Colors';

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
        <Icon name="ios-key" />
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
      <Item rounded style={styles.phoneInput}>
        <Icon name="ios-phone-portrait" />
        <Text style={styles.phoneCountryText}>+380</Text>
        <Input
          placeholderTextColor="#aaaaaa"
          placeholder="Телефон..."
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
            <Spinner color={activeColor} />
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
            <Item style={styles.tosContainer}>
              <Left>
                <View style={styles.tosTextContainer}>
                  <Text onPress={onTosPress} style={styles.smallFont}>
                    Ознакомлен(а) с&nbsp;
                    <Text style={[styles.activeColor, styles.smallFont]}>
                      условиями использования
                    </Text>
                  </Text>
                </View>
              </Left>
              <Right style={styles.switchContainer}>
                <Switch thumbColor='#fff' trackColor={trackColor} ios_backgroundColor={mainColor} onValueChange={this.changeTosAcceptance} value={this.state.tosAccespted} />
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    paddingLeft: 48,
    paddingRight: 48,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {},
  button: {
    marginTop: 12,
    backgroundColor: activeColor,
  },
  input: {
    fontSize: 17,
    color: '#ffffff',
    marginTop: -3,
    marginLeft: -6
  },
  phoneCountryText: {
    fontSize: 17,
    color: '#c9c9c9'
  },
  codeInput: {
    marginTop: 12,
    borderRadius: 4,
    backgroundColor: darkColor,
    borderColor: activeColor
  },
  helperActions: {
    marginTop: 24,
    color: activeColor,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  smallFont: {
    fontSize: 11
  },
  errorText: {
    color: '#ff0000'
  },
  activeColor: { color: activeColor },
  phoneInput: {
    borderRadius: 4,
    backgroundColor: darkColor,
    borderColor: activeColor
  },
  switchContainer: { flex: 0 },
  tosContainer: {
    borderBottomWidth: 0,
    marginTop: 8
  },
  tosTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
