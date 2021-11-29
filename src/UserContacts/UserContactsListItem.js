import React from 'react';
import PropTypes from 'prop-types';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Right, Body, Icon, ActionSheet } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { activeColor, disabledColor, secondaryColor, warningColor } from '../Colors';
import { invitationalSMS } from '../Utils';

export default class UserContactsListItem extends React.PureComponent {
  user = this.props.contact.user;

  openMore = () => {
    const blockOrUnblockActionName = this.props.contact.is_blocked ? 'Разблокировать' : 'Заблокировать';
    const actions = this.user
      ? ['Искать объявления', blockOrUnblockActionName, 'Отменить']
      : ['Искать объявления', blockOrUnblockActionName, 'Пригласить', 'Отменить'];
    const cancelIndex = this.user ? 2 : 3;
    ActionSheet.show(
      {
        title: `${this.props.contact.name}\n${this.props.contact.phone}`,
        options: actions,
        cancelButtonIndex: cancelIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.props.filterByContact(this.props.contact.name);
          case 1:
            return this.props.toggleBlock(this.props.contact.id);
          case 2:
            return this.sendInvitation();
        }
      },
    );
  };

  sendInvitation = () => {
    const { contact } = this.props;

    if (this.user) {
      return;
    }

    invitationalSMS(contact.phone, 'Привет, посмотри – очень удобно купить и продать авто: https://recar.io/get');
  };

  render() {
    const { contact } = this.props;
    const phoneStyle = this.user ? { color: activeColor, fontWeight: 'bold' } : {};

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.openMore}>
        <ListItem
          noIndent
          thumbnail
          noBorder
          activeOpacity={1}
          underlayColor="transparent"
          onPress={this.openMore}
          style={contact.is_blocked ? [styles.mainContainer, styles.blockedUser] : styles.mainContainer}>
          <Left>
            <UserAvatar
              size={48}
              name={contact.name || this.user?.name || ''}
              src={this.user?.avatar}
              bgColor={this.user ? activeColor : secondaryColor}
            />
          </Left>
          <Body>
            <Text style={phoneStyle}>{contact.name}</Text>
            <Text style={styles.contactPhoneStyle}>{contact.phone}</Text>
          </Body>
          <Right>
            <Icon name="ellipsis-horizontal-outline" />
          </Right>
        </ListItem>
      </TouchableOpacity>
    );
  }
}

UserContactsListItem.propTypes = {};

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: secondaryColor,
  },
  contactPhoneStyle: {
    fontSize: 12,
    color: disabledColor,
  },
  blockedUser: {
    opacity: 0.2,
  },
});
