import React from 'react';
import { StyleSheet, Switch, Image, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Input, Button, Container, Content, Item, Icon, Spinner, View, Left, Right, H1, H2 } from 'native-base';

import { TextInputMask } from 'react-native-masked-text';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { withTranslation } from 'react-i18next';

import {
  activeColor,
  trackColor,
  textColor,
  primaryColor,
  disabledColor,
  secondaryColor,
  spinnerColor,
  superActiveColor,
  activeTextColor,
} from 'colors';

import { onTosPress, random } from 'utils';

import UK_FLAG from 'assets/uk-flag.png';
import PHONE_OTP_GIF from 'assets/phone-otp.gif';

class LoginScreen extends React.Component {
  onInputPhone = (text) => this.props.onInputPhone(text);
  onInputCode = (text) => this.props.onInputCode(text);
  onRequest = () => this.props.onRequest(`${this.props.phone}`);
  onSignIn = () => this.props.onSignIn(this.props.phone, this.props.code);
  changeTosAcceptance = () => this.setState({ tosAccespted: !this.state.tosAccespted });
  onChangePhone = (maskedText, rawText) => this.onInputPhone(maskedText);
  phoneMaskOptions = { mask: '(99)999-99-99' };

  constructor(props) {
    super(props);
    this.state = { tosAccespted: false, phone: '+380' };
  }

  render() {
    const { t, phone, code, step, onRequest, onSignIn, onReset, isLoading } = this.props;
    const step1IsDisabled = !this.state.tosAccespted || phone.length !== 13;
    const step2IsDisabled = code.length !== 4;

    const requestButton = (
      <Button
        onPress={this.onRequest}
        style={step1IsDisabled ? styles.disabledButton : styles.button}
        block
        disabled={step1IsDisabled}
      >
        <Text style={styles.goButton}>{t('login.buttons.getCode')}</Text>
      </Button>
    );
    const signInButton = (
      <Button
        onPress={this.onSignIn}
        style={step2IsDisabled ? styles.disabledButton : styles.button}
        disabled={step2IsDisabled}
        block
      >
        <Text style={styles.goButton}>{t('login.buttons.signIn')}</Text>
      </Button>
    );
    const codeInput = (
      <Item style={styles.codeInput} rounded>
        <Icon name="ios-key-outline" style={styles.icon} />
        <Input
          style={styles.input}
          placeholder="1234"
          placeholderTextColor={disabledColor}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          onChangeText={this.onInputCode}
          maxLength={4}
          returnKeyType={'done'}
        />
      </Item>
    );
    const phoneInput = (
      <Item rounded style={styles.phoneInput}>
        <Icon name="call-outline" style={styles.icon} />
        <Image source={UK_FLAG} style={styles.flag} />
        <View style={styles.countryCodeNoteContainer}>
          <Text style={styles.countryCodeNote}>+380</Text>
        </View>
        <TextInputMask
          type={'custom'}
          options={this.phoneMaskOptions}
          placeholder="(50)123-45-67"
          placeholderTextColor={disabledColor}
          value={phone}
          includeRawValueInChangeText={true}
          keyboardType="numeric"
          onChangeText={this.onChangePhone}
          style={styles.phoneInputMasked}
          returnKeyType={'done'}
        />
      </Item>
    );
    if (isLoading) {
      return (
        <Container style={{ backgroundColor: primaryColor }}>
          <Content>
            <Spinner color={spinnerColor} />
          </Content>
        </Container>
      );
    }

    return (
      <KeyboardAwareScrollView extraHeight={128} bounces={false} keyboardShouldPersistTaps="always">
        <View style={styles.mainContainer}>
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <Image source={PHONE_OTP_GIF} style={{ width: 192, height: 192, alignSelf: 'center' }} />
              {step === 1 && (
                <>
                  <H1 style={styles.h1}>{t('login.headers.main')}</H1>
                  <H2 style={styles.h2}>{t('login.headers.secondary')}</H2>
                </>
              )}

              {step === 2 && (
                <>
                  <H1 style={styles.h1}>{t('login.headers.enterSms')}</H1>
                  <View style={styles.h2Container}>
                    <Text style={styles.h2}>{t('login.headers.smsWasSent')}</Text>
                    <Text style={styles.h2Note}> +380{phone.replace(/[\s-\(\)]/g, '').replace(/^\+380/g, '')}</Text>
                  </View>
                </>
              )}
            </View>
          </SafeAreaView>

          <View style={styles.contentContainer}>
            {step === 1 ? phoneInput : codeInput}

            {step === 1 ? requestButton : signInButton}
            {step === 1 && (
              <Item style={styles.tosContainer}>
                <Left>
                  <View style={styles.tosTextContainer}>
                    <Text onPress={onTosPress} style={styles.smallFont}>
                      {t('login.agreeTos')}&nbsp;
                      <Text style={[styles.smallFont, styles.activeColor]}>{t('login.tos')}</Text>
                    </Text>
                  </View>
                </Left>
                <Right style={styles.switchContainer}>
                  <Switch
                    thumbColor={secondaryColor}
                    trackColor={trackColor}
                    ios_backgroundColor={activeTextColor}
                    onValueChange={this.changeTosAcceptance}
                    value={this.state.tosAccespted}
                  />
                </Right>
              </Item>
            )}
            <View style={styles.linksContainer}>
              {step === 2 && (
                <Text onPress={onReset} style={styles.changePhoneText}>
                  &nbsp; {t('login.changeNumber')}
                </Text>
              )}
              {step === 2 && (
                <Text onPress={this.onRequest} style={styles.resendCodeText}>
                  <Text style={{ color: textColor }}>{t('login.didntReceive')}</Text>
                  &nbsp; {t('login.tryAgain')}
                </Text>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default withTranslation()(LoginScreen);

LoginScreen.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  onInputPhone: PropTypes.func.isRequired,
  onInputCode: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 0,
    backgroundColor: primaryColor,
    minHeight: '100%',
    flex: 1,
    padding: 16,
    flexDirection: 'column',
  },
  headerContainer: {
    minHeight: '40%',
  },
  h1: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: textColor,
  },
  h2: {
    fontSize: 16,
    marginBottom: 8,
    color: textColor,
  },
  button: {
    marginTop: 12,
    backgroundColor: activeColor,
    height: 52,
    borderRadius: 8,
  },
  disabledButton: {
    marginTop: 12,
    backgroundColor: disabledColor,
    height: 52,
    borderRadius: 8,
  },
  input: {
    fontSize: 17,
    color: textColor,
    padding: 0,
    margin: 0,
  },
  phoneCountryText: {
    fontSize: 17,
    color: disabledColor,
  },
  codeInput: {
    borderRadius: 8,
    backgroundColor: secondaryColor,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
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
    color: textColor,
  },
  activeColor: { color: activeColor },
  phoneInput: {
    borderRadius: 8,
    backgroundColor: secondaryColor,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 52,
  },
  phoneInputMasked: {
    fontSize: 18,
    height: '100%',
    width: '100%',
    color: textColor,
    fontWeight: 'bold',
    borderWidth: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  switchContainer: { flex: 0 },
  tosContainer: {
    borderBottomWidth: 0,
    marginTop: 16,
  },
  tosTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    color: disabledColor,
  },
  linksContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  resendCodeText: { color: activeColor, marginTop: 24 },
  changePhoneText: { color: activeColor, marginTop: 16 },
  disabledColor: { color: disabledColor },
  label: { marginBottom: 8 },
  mainLogo: {
    width: 96,
    height: 96,
  },
  headerText: {
    color: superActiveColor,
    fontWeight: '800',
  },
  goButton: {
    fontWeight: 'bold',
  },
  flag: { marginRight: -16 },
  h2Note: { color: textColor, fontWeight: 'bold' },
  countryCodeNoteContainer: { marginRight: 0, height: '100%', justifyContent: 'center' },
  countryCodeNote: { fontWeight: 'bold', fontSize: 18, color: textColor },
  h2Container: { marginBottom: 8 },
});
