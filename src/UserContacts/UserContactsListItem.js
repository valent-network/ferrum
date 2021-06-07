import React from 'react';
import PropTypes from 'prop-types';

import { Text, ListItem, Left, Right, Body, Thumbnail, Icon, ActionSheet } from 'native-base';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

import { activeColor, darkColor, disabledColor, borderColor } from '../Colors';
import { invitationalSMS } from '../Utils';

export default class UserContactsListItem extends React.PureComponent {
  user = this.props.contact.user;
  actions = this.user ? ['Искать объявления', 'Отменить'] : ['Искать объявления', 'Пригласить', 'Отменить'];
  cancelIndex = this.user ? 1 : 2;

  openMore = () =>
    ActionSheet.show(
      {
        title: `${this.props.contact.name}\n${this.props.contact.phone}`,
        options: this.actions,
        cancelButtonIndex: this.cancelIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.props.filterByContact(this.props.contact.name);
          case 1:
            return this.sendInvitation();
        }
      },
    );

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
      <ListItem
        noIndent
        thumbnail
        noBorder
        activeOpacity={1}
        underlayColor="transparent"
        onPress={this.openMore}
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
          <Text note>{contact.phone}</Text>
        </Body>
        <Right>
          <Icon name="ellipsis-horizontal-outline" />
        </Right>
      </ListItem>
    );
  }
}

UserContactsListItem.propTypes = {};

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: borderColor,
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
});
