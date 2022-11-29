import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { View, Text, Button } from 'native-base';

import { withTranslation } from 'react-i18next';

import ContactsUploading from './ContactsUploading';

import { checkContactsPermissions, requestContactsPermissions } from '../actions/userContactsActions';

import * as ActionTypes from '../actions/actionTypes.js';

import { goToSettings } from '../Utils';

import { activeColor, secondaryColor } from '../Colors';

class PermissionsBox extends React.PureComponent {

  onPress = () => (this.props.permissionsRequested ? goToSettings() : this.props.requestContactsPermissions());

  componentDidMount() {
    this.props.checkContactsPermissions();
  }
  render() {
    const { t } = this.props;

    const {
      permissionsGiven,
      permissionsRequested,
      checkContactsPermissions,
      userContactsCount,
      userContactsProcessed,
    } = this.props;

    if (permissionsGiven && permissionsRequested) {
      if (userContactsCount === 0 && !userContactsProcessed) {
        return <ContactsUploading />;
      } else {
        return null;
      }
    }

    return (
      <View style={styles.mainContainer}>
        <Text>{t('feed.permissionBoxText')}</Text>
        {
          <Button block style={styles.button} onPress={this.onPress}>
            <Text>{t('feed.permissionBoxSubmit')}</Text>
          </Button>
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    permissionsGiven: state.userContacts.permissionsGiven,
    permissionsRequested: state.userContacts.permissionsRequested,
    userContactsCount: state.user.userContactsCount,
    userContactsProcessed: state.user.contactsProcessed,
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
    backgroundColor: secondaryColor,
    margin: 12,
    padding: 12,
    borderColor: activeColor,
    borderRadius: 4,
  },
  button: {
    marginTop: 12,
    backgroundColor: activeColor,
  },
});
