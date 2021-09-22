import React from 'react';
import PropTypes from 'prop-types';

import { Text, ListItem, Left, Right, Body, Thumbnail, Icon, Button } from 'native-base';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

import { activeColor, disabledColor, primaryColor, secondaryColor } from '../Colors';

import DEFAULT_AVATAR from '../assets/default_avatar.png';

import { invitationalSMS } from '../Utils';

const INVITATIONAL_TEXT = 'Привет, посмотри – очень удобно купить и продать авто: https://recar.io/get';

export default class UsersListItem extends React.PureComponent {
  render() {
    const { contact, onUserPress } = this.props;

    return (
      <ListItem noIndent thumbnail noBorder activeOpacity={1} underlayColor="transparent" style={styles.mainContainer}>
        <Left>
          <Image style={styles.defaultAvatar} source={DEFAULT_AVATAR} />
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
  defaultAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderColor: activeColor,
    borderWidth: 2,
  },
  contactPhoneStyle: {
    fontSize: 12,
    color: disabledColor,
  },
});
