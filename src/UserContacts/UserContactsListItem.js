import React from 'react';
import PropTypes from 'prop-types';

import { Text, ListItem, Left, Right, Body, Thumbnail, Icon, ActionSheet } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';

import { activeColor } from '../Colors';

export default class UserContactsListItem extends React.PureComponent {
  user = this.props.contact.user
  actions = this.user ? ['Поиск', 'Отменить'] : ['Поиск', 'Пригласить', 'Отменить']
  cancelIndex = this.user ? 1 : 2

  openMore = () => ActionSheet.show(
    {
      options: this.actions,
      cancelButtonIndex: this.cancelIndex,
    },
    buttonIndex => {
      switch(buttonIndex) {
        case 0: return this.props.filterByContactDispatched(this.props.contact.name)
        case 1: return this.sendInvitation()
      }
    }
  );

  sendInvitation = () => {
    const { invitationalSMS, contact } = this.props;

    if (this.user) { return }

    invitationalSMS(contact.phone);
  }

  render() {
    const { contact } = this.props;
    const phoneStyle = this.user ? { color: activeColor, fontWeight: 'bold' } : {}

    return (
        <ListItem thumbnail noBorder activeOpacity={1} underlayColor='transparent' onPress={this.openMore}>
          <Left>
            {this.user && this.user.avatar && <Thumbnail source={{ uri: this.user.avatar }} style={{width: 36, height: 36, borderRadius: 18, borderColor: activeColor, borderWidth: 2}}/>}
            {(!this.user || !this.user.avatar)&& <Image style={{width: 36, height: 36, borderRadius: 18, borderColor: '#555', borderWidth: 2}} source={require('../assets/default_avatar.png')} />}
          </Left>
          <Body>
            <Text style={phoneStyle}>{contact.name}</Text>
            <Text note>{contact.phone}</Text>
          </Body>
          <Right>
            <Icon name='ellipsis-horizontal-outline' />
          </Right>
        </ListItem>
    );
  }
}

UserContactsListItem.propTypes = {};
