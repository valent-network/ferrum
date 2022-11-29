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

import { withTranslation } from 'react-i18next';

import {
  activeColor,
  trackColor,
  lightColor,
  primaryColor,
  disabledColor,
  secondaryColor,
  spinnerColor,
} from '../Colors';

import { onTosPress, random } from '../Utils';

import RECARIO_LOGO from '../assets/recario.png';

import FLAG from '../assets/Flag.png';
import UNION from '../assets/Union.png';
import ELLIPSE from '../assets/Ellipse.png';

class LoginScreen extends React.Component {
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
    const { t, phone, code, step, onRequest, onSignIn, onReset, isLoading } = this.props;
    const step1IsDisabled = !this.state.tosAccespted || phone.length !== 12;
    const step2IsDisabled = code.length !== 4;

    const requestButton = (
      <Button
        onPress={this.onRequest}
        style={step1IsDisabled ? styles.disabledButton : styles.button}
        block
        disabled={step1IsDisabled}>
        <Text style={styles.goButton}>{t('login.buttons.getCode')}</Text>
      </Button>
    );
    const signInButton = (
      <Button
        onPress={this.onSignIn}
        style={step2IsDisabled ? styles.disabledButton : styles.button}
        disabled={step2IsDisabled}
        block>
        <Text style={styles.goButton}>{t('login.buttons.signIn')}</Text>
      </Button>
    );
    const codeInput = (
      <React.Fragment>
        <H1 style={styles.h1}>{t('login.headers.enterSms')}</H1>
        <View style={styles.h2Container}>
          <Text style={styles.h2}>{t('login.headers.smsWasSent')}</Text>
          <Text style={styles.h2Note}> +380{phone.replace(/[\s-\(\)]/g, '').replace(/^\+380/g, '')}</Text>
        </View>
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
      </React.Fragment>
    );
    const phoneInput = (
      <React.Fragment>
        <H1 style={styles.h1}>{t('login.headers.main')}</H1>
        <H2 style={styles.h2}>{t('login.headers.secondary')}</H2>
        <Item rounded style={styles.phoneInput}>
          <Image source={FLAG} style={styles.flag} />
          <View style={styles.countryCodeNoteContainer}>
            <Text style={styles.countryCodeNote}>+380</Text>
          </View>
          <TextInputMask
            type={'custom'}
            options={this.phoneMaskOptions}
            placeholder="50 123-45-67"
            placeholderTextColor={disabledColor}
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
          <Text style={styles.headerText}>{t('login.companyName')}</Text>
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
                        {t('login.agreeTos')}&nbsp;
                        <Text style={[styles.activeColor, styles.smallFont]}>{t('login.tos')}</Text>
                      </Text>
                    </View>
                  </Left>
                  <Right style={styles.switchContainer}>
                    <Switch
                      thumbColor={lightColor}
                      trackColor={trackColor}
                      ios_backgroundColor={secondaryColor}
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
                  &nbsp; {t('login.changeNumber')}
                </Text>
              )}
              {step === 2 && (
                <Text onPress={this.onRequest} style={styles.resendCodeText}>
                  <Text>{t('login.didntReceive')}</Text>
                  &nbsp; {t('login.tryAgain')}
                </Text>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
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
    justifyContent: 'center',
    minHeight: '100%',
  },
  h1: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: lightColor,
  },
  h2: {
    fontSize: 16,
    marginBottom: 8,
    color: disabledColor,
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
    color: lightColor,
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
    borderColor: lightColor,
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
  },
  activeColor: { color: activeColor },
  phoneInput: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: lightColor,
    height: 52,
  },
  phoneInputMasked: {
    fontSize: 18,
    height: '100%',
    width: '100%',
    color: lightColor,
    fontWeight: 'bold',
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
    color: disabledColor,
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
    backgroundColor: '#3C3C5D',
    height: '20%',
    width: '100%',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 0,
  },
  headerText: {
    color: lightColor,
  },
  goButton: {
    fontWeight: 'bold',
  },
  flag: { marginLeft: 16 },
  h2Note: { color: lightColor, fontWeight: 'bold' },
  countryCodeNoteContainer: { marginRight: 16 },
  countryCodeNote: { fontWeight: 'bold', fontSize: 18, color: lightColor },
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
    backgroundColor: primaryColor,
  },
});
