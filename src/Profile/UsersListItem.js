import React from 'react';
import PropTypes from 'prop-types';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Right, Body, Icon, Button } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { activeColor, disabledColor, primaryColor, secondaryColor } from '../Colors';

import { invitationalSMS } from '../Utils';

const INVITATIONAL_TEXT = 'Привет, посмотри – очень удобно купить и продать авто: https://recar.io/get';

export default class UsersListItem extends React.PureComponent {
  render() {
    const { contact, onUserPress } = this.props;

    return (
      <ListItem noIndent thumbnail noBorder activeOpacity={1} underlayColor="transparent" style={styles.mainContainer}>
        <Left>
          <UserAvatar size={48} name={contact.name || ''} src={null} bgColor={secondaryColor} />
        </Left>
        <Body>
          <Text>{contact.name}</Text>
          <Text style={styles.contactPhoneStyle}>{contact.phone}</Text>
        </Body>
        <Right>
          <Button style={styles.actionButton} onPress={() => invitationalSMS(contact.phone, INVITATIONAL_TEXT)}>
            <Text>Пригласить</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

UsersListItem.propTypes = {};

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: activeColor,
  },
  mainContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: secondaryColor,
    backgroundColor: primaryColor,
  },
  contactPhoneStyle: {
    fontSize: 12,
    color: disabledColor,
  },
});
