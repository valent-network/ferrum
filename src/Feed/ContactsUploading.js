import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Spinner, Button, Text, Content, Icon } from 'native-base';

import { activeColor } from '../Colors';

export default class ContactsUploading extends React.PureComponent {
  render() {
    return <Button iconLeft style={styles.contactsUploadingButton}>
              <Icon name='people-sharp' />
              <Text>Обработка контактной книги...</Text>
              <Spinner size='small' color='#fff' />
              <Text>&nbsp;</Text>
            </Button>
  }
}

const styles = StyleSheet.create({
  contactsUploadingButton: {
    margin: 16,
    backgroundColor: activeColor
  }
});
