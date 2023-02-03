import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image } from 'react-native';

import { View, Text, Button } from 'native-base';

import { withTranslation } from 'react-i18next';

import { checkContactsPermissions, requestContactsPermissions } from 'actions/phoneContacts';

import * as ActionTypes from 'actions/types';

import { goToSettings } from 'utils';

import { activeColor, secondaryColor, superActiveColor } from 'colors';

import NOT_ALLOWED from 'assets/not-allowed.png';

class PermissionsBox extends React.PureComponent {
  onPress = () => (this.props.permissionsRequested ? goToSettings() : this.props.requestContactsPermissions());

  componentDidMount() {
    this.props.checkContactsPermissions();
  }
  render() {
    const { permissionsGiven, t } = this.props;

    if (permissionsGiven) return null;

    return (
      <>
        <View style={styles.mainContainer}>
          <Image style={styles.picture} source={NOT_ALLOWED} />
          <Text style={styles.mainText}>{t('feed.permissionBoxText')}</Text>
          <Button block style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}>{t('feed.permissionBoxSubmit')}</Text>
          </Button>
        </View>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    permissionsGiven: state.userContacts.permissionsGiven,
    permissionsRequested: state.userContacts.permissionsRequested,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkContactsPermissions: () => dispatch(checkContactsPermissions()),
    requestContactsPermissions: () => dispatch(requestContactsPermissions()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PermissionsBox));

PermissionsBox.propTypes = {};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: activeColor,
    marginHorizontal: 0,
    marginBottom: 16,
    padding: 6,
    borderColor: activeColor,
    borderRadius: 4,
    color: superActiveColor,
  },
  button: {
    marginTop: 12,
    backgroundColor: superActiveColor,
  },
  buttonText: {
    color: activeColor,
    fontWeight: 'bold',
  },
  mainText: { fontSize: 13, paddingLeft: 96, color: secondaryColor },
  picture: {
    position: 'absolute',
    left: 0,
    width: 96,
    height: 96,
  },
});
