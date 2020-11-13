import React from 'react';
import { StyleSheet, Switch, Linking, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  Input,
  Button,
  Container,
  Content,
  Item,
  Icon,
  Spinner,
  View,
  Left,
  Right,
  Thumbnail,
} from 'native-base';

import { TextInputMask } from 'react-native-masked-text';

import { darkColor, activeColor, mainColor, trackColor } from '../Colors';

import { onTosPress } from '../Utils';

export default class LoginScreen extends React.Component {
  onInputPhone = (text) => this.props.onInputPhone(text);
  onInputCode = (text) => this.props.onInputCode(text);
  onRequest = () => this.props.onRequest(this.props.phone);
  onSignIn = () => this.props.onSignIn(this.props.phone, this.props.code);
  changeTosAcceptance = () => this.setState({ tosAccespted: !this.state.tosAccespted });

  constructor(props) {
    super(props);
    this.state = { tosAccespted: false };
  }

  render() {
    const { phone, code, step, onRequest, onSignIn, onReset, isLoading } = this.props;
    const step1IsDisabled = !this.state.tosAccespted || phone.length !== 19;
    const step2IsDisabled = code.length !== 4;

    const requestButton = (
      <Button
        onPress={this.onRequest}
        style={step1IsDisabled ? styles.disabledButton : styles.button}
        block
        disabled={step1IsDisabled}>
        <Text>Получить код</Text>
      </Button>
    );
    const signInButton = (
      <Button
        onPress={this.onSignIn}
        style={step2IsDisabled ? styles.disabledButton : styles.button}
        disabled={step2IsDisabled}
        block>
        <Text>Войти</Text>
      </Button>
    );
    const codeInput = (
      <Item style={styles.codeInput} rounded>
        <Icon name="ios-key" style={styles.icon} />
        <Input
          style={styles.input}
          placeholder="0000"
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          onChangeText={this.onInputCode}
          maxLength={4}
        />
      </Item>
    );
    const phoneInput = (
      <Item rounded style={styles.phoneInput}>
        <Icon name="call-outline" style={styles.icon} />
        <TextInputMask
          type={'custom'}
          options={{
            /**
             * mask: (String | required | default '')
             * the mask pattern
             * 9 - accept digit.
             * A - accept alpha.
             * S - accept alphanumeric.
             * * - accept all, EXCEPT white space.
             */
            mask: '+380 (99) 999-99-99',
          }}
          placeholder="+380 (00) 000-00-00"
          value={this.props.phone}
          includeRawValueInChangeText={true}
          keyboardType="numeric"
          onChangeText={(maskedText, rawText) => this.onInputPhone(maskedText)}
          style={{ fontSize: 18, height: '100%', width: '100%' }}
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
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Content contentContainerStyle={styles.mainContainer}>
            <View style={styles.contentWrapper}>
              <View style={styles.contentContainer}>
                <Text style={styles.header}>Вход</Text>
                {step === 1 ? phoneInput : codeInput}

                {step === 1 ? requestButton : signInButton}
                {step === 1 && (
                  <Item style={styles.tosContainer}>
                    <Left>
                      <View style={styles.tosTextContainer}>
                        <Text onPress={onTosPress} style={styles.smallFont}>
                          Ознакомлен(а) с&nbsp;
                          <Text style={[styles.activeColor, styles.smallFont]}>условиями использования</Text>
                        </Text>
                      </View>
                    </Left>
                    <Right style={styles.switchContainer}>
                      <Switch
                        thumbColor="#fff"
                        trackColor={trackColor}
                        ios_backgroundColor={mainColor}
                        onValueChange={this.changeTosAcceptance}
                        value={this.state.tosAccespted}
                      />
                    </Right>
                  </Item>
                )}
              </View>

              <View>
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
              </View>
            </View>

            <Thumbnail style={styles.topAbsolute} source={require('../assets/recario.png')} />
            <Text note style={styles.bottomAbsolute}>
              РЕКАРИО
            </Text>
          </Content>
        </Container>
      </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 24,
  },
  button: {
    marginTop: 12,
    backgroundColor: activeColor,
  },
  disabledButton: {
    marginTop: 12,
    backgroundColor: 'grey',
  },
  input: {
    fontSize: 17,
    color: '#222',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  phoneCountryText: {
    fontSize: 17,
    color: '#666',
  },
  codeInput: {
    borderRadius: 4,
    backgroundColor: '#c9c9c9',
    borderColor: '#c9c9c9',
  },
  helperActions: {
    marginTop: 24,
    color: activeColor,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  smallFont: {
    fontSize: 11,
  },
  activeColor: { color: activeColor },
  phoneInput: {
    borderRadius: 4,
    backgroundColor: '#c9c9c9',
    borderColor: '#c9c9c9',
    height: 42,
  },
  switchContainer: { flex: 0 },
  tosContainer: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  tosTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  safeAreaView: {
    flex: 1,
  },
  topAbsolute: {
    position: 'absolute',
    top: 24,
  },
  bottomAbsolute: {
    position: 'absolute',
    bottom: 24,
  },
  contentWrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  contentContainer: {
    backgroundColor: '#222',
    padding: 24,
    borderRadius: 4,
  },
  icon: {
    color: '#333',
  },
  header: {
    marginBottom: 16,
    fontSize: 24,
  },
});
