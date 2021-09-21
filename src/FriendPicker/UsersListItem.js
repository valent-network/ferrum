import React from 'react';
import PropTypes from 'prop-types';

import { Text, ListItem, Left, Right, Body, Thumbnail, Icon } from 'native-base';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

import { activeColor, darkColor, disabledColor, appearanceBgColor, menuItemColor } from '../Colors';
import { invitationalSMS } from '../Utils';

export default class UsersListItem extends React.PureComponent {
  user = this.props.contact.user;

  render() {
    const { contact, onUserPress } = this.props;
    const phoneStyle = this.user ? { color: activeColor, fontWeight: 'bold' } : {};

    const friend = {
      avatar: contact.user.avatar,
      id: contact.id,
      idx: 1,
      name: contact.name,
      phone_number: contact.phone,
      user_id: contact.user.id,
      user_name: contact.user.name,
    };

    return (
      <ListItem
        noIndent
        thumbnail
        noBorder
        activeOpacity={1}
        underlayColor="transparent"
        onPress={() => onUserPress(friend)}
        style={styles.mainContainer}>
        <Left>
          {this.user && this.user.avatar && (
            <Thumbnail source={{ uri: this.user.avatar }} style={styles.avatarThumbnail} />
          )}
          {(!this.user || !this.user.avatar) && (
            <Image style={styles.defaultAvatar} source={require('../assets/default_avatar.png')} />
          )}
        </Left>
        <Body>
          <Text style={phoneStyle}>{contact.name}</Text>
          <Text style={styles.contactPhoneStyle}>{contact.phone}</Text>
        </Body>
        <Right>
          <Icon name="chevron-forward-outline" />
        </Right>
      </ListItem>
    );
  }
}

UsersListItem.propTypes = {};

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: menuItemColor,
    backgroundColor: appearanceBgColor,
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
