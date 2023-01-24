import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from 'react-native';

import { getAuthPhone } from 'services/AsyncStorage';

import * as ActionTypes from 'actions/types';

import {
  signIn,
  requestCode,
  changePhone,
  changeCode,
  phoneIsInvalidFormat,
  codeIsInvalidFormat,
  onReset,
} from 'actions/sessions';

import LoginScreen from './LoginScreen';

class LoginContainer extends React.PureComponent {
  static navigationOptions = { headerShown: false };

  checkCachedAuth = () => {
    if (!(AppState.currentState === 'active')) return;

    getAuthPhone().then((phone) => {
      if (phone && phone !== this.props.phone) {
        this.props.onReturnWhileAuthInProgress(phone);
      }
    });
  };

  componentDidMount() {
    AppState.addEventListener('change', this.checkCachedAuth);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.checkCachedAuth);
  }

  render() {
    const { onReset, onRequest, onSignIn, onInputCode, onInputPhone, phone, code, step, isLoading } = this.props;

    return (
      <LoginScreen
        onRequest={onRequest}
        onSignIn={onSignIn}
        onInputPhone={onInputPhone}
        onInputCode={onInputCode}
        onReset={onReset}
        phone={phone}
        code={code}
        step={step}
        isLoading={isLoading}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    phone: state.auth.phone,
    code: state.auth.code,
    step: state.auth.step,
    isLoading: state.auth.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInputPhone: (phone) => dispatch(changePhone(phone)),
    onInputCode: (code) => dispatch(changeCode(code)),
    onReturnWhileAuthInProgress: (phone) => dispatch({ type: ActionTypes.PHONE_FROM_CACHE, phone: phone }),
    onReset: () => dispatch(onReset()),
    onSignIn: (phone, code) => {
      const phoneShort = phone.replace(/[\s-\(\)]/g, '').substr(0, 17);

      dispatch(signIn(phoneShort, code));
    },
    onRequest: (phone) => {
      const phoneShort = phone.replace(/[\s-\(\)]/g, '').substr(0, 17);

      dispatch(requestCode(phoneShort));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  onInputPhone: PropTypes.func.isRequired,
  onInputCode: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  phone: PropTypes.string,
  code: PropTypes.string,
  step: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
};
