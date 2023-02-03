import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';
import { Spinner, View, Text, Content, Icon } from 'native-base';
import { withTranslation } from 'react-i18next';

import { superActiveColor } from 'colors';

import { checkContactsPermissions } from 'actions/phoneContacts';

import CONTACTS_UPLOADING from 'assets/contacts-uploading.gif';

class ContactsUploading extends React.PureComponent {
  componentDidMount() {
    this.props.checkContactsPermissions();
  }

  render() {
    const { permissionsGiven, permissionsRequested, userContactsCount, userContactsProcessed } = this.props;

    if (!permissionsGiven) return null;
    if (!permissionsRequested) return null;
    if (userContactsCount !== 0) return null;
    if (userContactsProcessed) return null;

    return (
      <View style={styles.centered}>
        <Image style={styles.picture} source={CONTACTS_UPLOADING} />
        <Text>{this.props.t('feed.contactsProcessingText')}</Text>
        <Spinner size="small" style={{ alignSelf: 'center' }} color={superActiveColor} />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContactsUploading));

const styles = StyleSheet.create({
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
  centered: { alignItems: 'center' },
});
