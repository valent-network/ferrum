import React from 'react';
import { StyleSheet, Switch, Linking, Image } from 'react-native';
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
  H1,
  H2,
} from 'native-base';

import { TextInputMask } from 'react-native-masked-text';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  activeColor,
  trackColor,
  lightColor,
  primaryColor,
  disabledColor,
  secondaryColor,
  spinnerColor,
  UABlue,
  UAYellow,
  disabledYellowColor,
} from '../Colors';

import { onTosPress, random } from '../Utils';

import RECARIO_LOGO from '../assets/recario.png';

import FLAG from '../assets/Flag.png';
import UNION from '../assets/Union.png';
import ELLIPSE from '../assets/Ellipse.png';

export default class LoginScreen extends React.Component {
  onInputPhone = (text) => this.props.onInputPhone(text);
  onInputCode = (text) => this.props.onInputCode(text);
  onRequest = () => this.props.onRequest(`${this.props.phone}`);
  onSignIn = () => this.props.onSignIn(this.props.phone, this.props.code);
  changeTosAcceptance = () => this.setState({ tosAccespted: !this.state.tosAccespted });
  onChangePhone = (maskedText, rawText) => this.onInputPhone(maskedText);
  phoneMaskOptions = { mask: '99 999-99-99' };

  constructor(props) {
    super(props);
    this.state = { tosAccespted: false, phone: '+380' };
  }

  render() {
    const { phone, code, step, onRequest, onSignIn, onReset, isLoading } = this.props;
    const step1IsDisabled = !this.state.tosAccespted || phone.length !== 12;
    const step2IsDisabled = code.length !== 4;

    const requestButton = (
      <Button
        onPress={this.onRequest}
        style={step1IsDisabled ? styles.disabledButton : styles.button}
        block
        disabled={step1IsDisabled}>
        <Text style={styles.goButton}>Получить код</Text>
      </Button>
    );
    const signInButton = (
      <Button
        onPress={this.onSignIn}
        style={step2IsDisabled ? styles.disabledButton : styles.button}
        disabled={step2IsDisabled}
        block>
        <Text style={styles.goButton}>Войти</Text>
      </Button>
    );
    const codeInput = (
      <React.Fragment>
        <H1 style={styles.h1}>Введите код из SMS</H1>
        <View style={styles.h2Container}>
          <Text style={styles.h2}>SMS с кодом было отправлено на номер</Text>
          <Text style={styles.h2Note}> +380{phone.replace(/[\s-\(\)]/g, '').replace(/^\+380/g, '')}</Text>
        </View>
        <Item style={styles.codeInput} rounded>
          <Icon name="ios-key-outline" style={styles.icon} />
          <Input
            style={styles.input}
            placeholder="1234"
            placeholderTextColor={disabledYellowColor}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            onChangeText={this.onInputCode}
            maxLength={4}
            returnKeyType={'done'}
          />
        </Item>
      </React.Fragment>
    );
    const phoneInput = (
      <React.Fragment>
        <H1 style={styles.h1}>Войдите с помощью мобильного телефона</H1>
        <H2 style={styles.h2}>Мы отправим SMS с кодом, чтобы вы не придумывали очередной пароль</H2>
        <Item rounded style={styles.phoneInput}>
          <Image source={FLAG} style={styles.flag} />
          <View style={styles.countryCodeNoteContainer}>
            <Text style={styles.countryCodeNote}>+380</Text>
          </View>
          <TextInputMask
            type={'custom'}
            options={this.phoneMaskOptions}
            placeholder="50 XXX-XX-XX"
            placeholderTextColor={disabledYellowColor}
            value={phone}
            includeRawValueInChangeText={true}
            keyboardType="numeric"
            onChangeText={this.onChangePhone}
            style={styles.phoneInputMasked}
            returnKeyType={'done'}
          />
        </Item>
      </React.Fragment>
    );
    if (isLoading) {
      return (
        <Container>
          <Content>
            <Spinner color={spinnerColor} />
          </Content>
        </Container>
      );
    }

    return (
      <View style={styles.wrapperContainer}>
        <View style={styles.header}>
          <Thumbnail source={RECARIO_LOGO} style={styles.mainLogo} />
          <Text style={styles.headerText}>Р Е К А Р И О</Text>
          <Image source={UNION} style={styles.union} />
          <Image source={ELLIPSE} style={styles.ellipse} />
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.mainContainer}
          extraHeight={128}
          bounces={false}
          keyboardShouldPersistTaps="always">
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
                        <Text style={[styles.activeColor, styles.smallFont, styles.underLine ]}>условиями использования</Text>
                      </Text>
                    </View>
                  </Left>
                  <Right style={styles.switchContainer}>
                    <Switch
                      thumbColor={lightColor}
                      trackColor={trackColor}
                      ios_backgroundColor={disabledYellowColor}
                      onValueChange={this.changeTosAcceptance}
                      value={this.state.tosAccespted}
                    />
                  </Right>
                </Item>
              )}
            </View>
            <View style={styles.linksContainer}>
              {step === 2 && (
                <Text onPress={onReset} style={styles.changePhoneText}>
                  &nbsp; Изменить телефон
                </Text>
              )}
              {step === 2 && (
                <Text onPress={this.onRequest} style={styles.resendCodeText}>
                  <Text style={styles.disabledYellowColor}>Не приходит код?</Text>
                  &nbsp; Отправить код ещё раз
                </Text>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
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
    justifyContent: 'center',
    minHeight: '100%',
  },
  h1: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: primaryColor,
  },
  h2: {
    fontSize: 16,
    marginBottom: 8,
    color: secondaryColor,
  },
  button: {
    marginTop: 12,
    height: 52,
    borderRadius: 8,
    backgroundColor: activeColor
  },
  disabledButton: {
    marginTop: 12,
    backgroundColor: disabledYellowColor,
    height: 52,
    borderRadius: 8,
  },
  input: {
    fontSize: 17,
    color: primaryColor,
    padding: 0,
    margin: 0,
  },
  phoneCountryText: {
    fontSize: 17,
    color: disabledColor,
  },
  codeInput: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: UABlue,
    height: 52,
  },
  helperActions: {
    marginTop: 24,
    color: activeColor,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  smallFont: {
    fontSize: 12,
    color: secondaryColor,
  },
  activeColor: { color: activeColor },
  phoneInput: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: UABlue,
    height: 52,
  },
  phoneInputMasked: {
    fontSize: 18,
    height: '100%',
    width: '100%',
    color: primaryColor,
    borderWidth: 0,
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
    paddingTop: 48,
    color: activeColor,
    alignSelf: 'center',
  },
  contentContainer: {
    backgroundColor: 'transparent',
    padding: 24,
    margin: 0,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: UABlue,
  },
  linksContainer: {
    alignItems: 'flex-end',
    paddingTop: 16,
  },
  resendCodeText: { color: activeColor, paddingTop: 24 },
  changePhoneText: { color: activeColor },
  disabledColor: { color: disabledColor },
  label: { marginBottom: 8 },
  mainLogo: {
    marginBottom: 16,
  },
  header: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 0,
    backgroundColor: UABlue,
    height: '20%',
    width: '100%',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 0,
  },
  headerText: {
    color: UAYellow,
  },
  goButton: {
    fontWeight: 'bold',
  },
  flag: { marginLeft: 16 },
  h2Note: { color: primaryColor, fontWeight: 'bold' },
  countryCodeNoteContainer: { marginRight: 16 },
  countryCodeNote: { fontWeight: 'bold', fontSize: 18, color: UABlue },
  h2Container: { marginBottom: 8 },
  union: {
    position: 'absolute',
    left: random(100, 200),
    bottom: 10,
  },
  ellipse: {
    position: 'absolute',
    top: 40,
    right: random(100, 200),
  },
  wrapperContainer: {
    backgroundColor: UAYellow,
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  disabledYellowColor: {
    color: disabledYellowColor,
  },
});
