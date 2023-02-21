import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { View, Text, Button, Icon } from 'native-base';

import { withTranslation } from 'react-i18next';

import { checkContactsPermissions, requestContactsPermissions } from 'actions/phoneContacts';

import * as ActionTypes from 'actions/types';

import { goToSettings } from 'utils';

import { activeColor, textColor, activeTextColor, primaryColor, deletedColor } from 'colors';

class PermissionsBox extends React.PureComponent {
  onPress = () => (this.props.permissionsRequested ? goToSettings() : this.props.requestContactsPermissions());

  componentDidMount() {
    this.props.checkContactsPermissions();
  }
  render() {
    const { permissionsGiven, t } = this.props;

    if (permissionsGiven) return null;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Icon name="alert-circle" style={styles.info} />
          <Text style={styles.header} t>
            {t('feed.permissionBoxHeader')}
          </Text>
        </View>
        <Text style={styles.mainText}>{t('feed.permissionBoxText')}</Text>
        <Button block style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonText}>{t('feed.permissionBoxSubmit')}</Text>
        </Button>
      </View>
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
    paddingBottom: 16,
    backgroundColor: primaryColor,
    paddingHorizontal: 16,
  },
  headerContainer: { flexDirection: 'row', justifyContent: 'flex-start' },
  header: { color: textColor, alignSelf: 'center', fontWeight: 'bold' },
  button: {
    backgroundColor: activeColor,
    marginTop: 16,
  },
  buttonText: {
    color: activeTextColor,
    fontWeight: 'bold',
  },
  mainText: { fontSize: 15, color: textColor },
  info: {
    color: deletedColor,
    fontSize: 24,
  },
});
