import React from 'react';
import { StyleSheet, Switch, Linking, ImageBackground } from 'react-native';
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

import { darkColor, activeColor, mainColor, trackColor, lightColor } from '../Colors';

import { onTosPress } from '../Utils';

export default class LoginScreen extends React.Component {
  onInputPhone = (text) => this.props.onInputPhone(text);
  onInputCode = (text) => this.props.onInputCode(text);
  onRequest = () => this.props.onRequest(this.props.phone);
  onSignIn = () => this.props.onSignIn(this.props.phone, this.props.code);
  changeTosAcceptance = () => this.setState({ tosAccespted: !this.state.tosAccespted });
  onChangePhone = (maskedText, rawText) => this.onInputPhone(maskedText);
  phoneMaskOptions = { mask: '+380 (99) 999-99-99' };

  constructor(props) {
    super(props);
    this.state = { tosAccespted: false, phone: '+380' };
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
        <Icon name="ios-key-outline" style={styles.icon} />
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
          options={this.phoneMaskOptions}
          placeholder="+380 (77) 555-00-88"
          placeholderTextColor="#aaaaaa"
          value={this.props.phone}
          includeRawValueInChangeText={true}
          keyboardType="numeric"
          onChangeText={this.onChangePhone}
          style={styles.phoneInputMasked}
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
      <View style={styles.mainContainer}>
        <View style={styles.contentWrapper}>
          <ImageBackground source={require('../assets/bg.jpg')} style={{flex: 1, resizeMode: 'stretch', width: '100%', height: '100%'}} />

          <Text style={styles.header}>ВОЙТИ</Text>
          <View style={styles.contentContainer}>
          <View>
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
                <Button light bordered style={{borderColor: '#363636'}}>
                  <Icon name="refresh-outline" style={{color: '#727272'}} />
                  <Text onPress={this.onRequest} style={{color: '#727272'}}>
                    Отправить код ещё раз
                  </Text>
                </Button>
              )}
              {step === 2 && (
                <Button light bordered style={{marginTop: 16, borderColor: '#363636'}}>
                  <Icon name="arrow-back-outline" style={{color: '#727272'}} />
                  <Text onPress={onReset} style={{color: '#727272'}}>
                    Изменить телефон
                  </Text>
                </Button>
              )}
            </View>
          </View>

        </View>

        <Text note style={styles.bottomAbsolute}>
          РЕКАРИО
        </Text>
      </View>
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
    paddingVertical: 0,
    margin: 0,
    height: '100%'
  },
  button: {
    marginTop: 12,
    backgroundColor: activeColor,
    height: 52,
    borderRadius: 8
  },
  disabledButton: {
    marginTop: 12,
    backgroundColor: 'grey',
    height: 52,
    borderRadius: 8
  },
  input: {
    fontSize: 17,
    color: '#222',
    padding: 0,
    margin: 0,
  },
  phoneCountryText: {
    fontSize: 17,
    color: '#666',
  },
  codeInput: {
    borderRadius: 8,
    backgroundColor: '#c9c9c9',
    borderColor: '#c9c9c9',
    height: 52,
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
    borderRadius: 8,
    backgroundColor: '#c9c9c9',
    borderColor: '#c9c9c9',
    height: 52,

  },
  phoneInputMasked: {
    fontSize: 18,
    height: '100%',
    width: '100%',
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
  bottomAbsolute: {
    position: 'absolute',
    bottom: 48,
  },
  contentWrapper: {
    width: '100%',
    alignSelf: 'flex-end',
    padding: 0,
    margin: 0,
    width: '100%',
  },
  contentContainer: {
    backgroundColor: mainColor,
    padding: 24,
    paddingTop: 48,
    paddingBottom: 0,
    margin: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '60%',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 96,
  },
  icon: {
    color: '#333',
  },
  header: {
    top: 96,
    left: 24,
    fontSize: 36,
    position: 'absolute',
    color: lightColor
  },
});
