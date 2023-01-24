import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Spinner, Button, Text, Content, Icon } from 'native-base';

import { activeColor, lightColor } from 'colors';

export default class ContactsUploading extends React.PureComponent {
  render() {
    return (
      <Button iconLeft block style={styles.contactsUploadingButton}>
        <Icon name="people-sharp" />
        <Text>{this.props.t('feed.contactsProcessingText')}</Text>
        <Spinner size="small" color={lightColor} />
        <Text>&nbsp;</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  contactsUploadingButton: {
    margin: 16,
    backgroundColor: activeColor,
  },
});
