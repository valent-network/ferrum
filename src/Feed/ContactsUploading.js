import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button, Text, Content, Icon } from 'native-base';

import CSS from '../Styles';

export default class ContactsUploading extends React.PureComponent {
  render() {
    return <Button iconLeft rounded light style={{margin: 16}}>
              <Icon name='people-sharp' />
              <Text>Обработка контактной книги...</Text>
              <Spinner size='small' color={CSS.activeColor} />
              <Text>&nbsp;</Text>
            </Button>
  }
}
