import React from 'react';
import PropTypes from 'prop-types';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Right, Body, Icon } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { activeColor, textColor, secondaryColor, primaryColor } from 'colors';
import { invitationalSMS } from 'utils';

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
        style={styles.mainContainer}
      >
        <Left>
          <UserAvatar
            size={48}
            name={friend.name || friend.user_name || ''}
            src={contact.user.avatar}
            bgColor={activeColor}
          />
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
    borderBottomColor: primaryColor,
    backgroundColor: secondaryColor,
  },
  contactPhoneStyle: {
    fontSize: 12,
    color: textColor,
  },
});
