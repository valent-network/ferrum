import React from 'react';
import PropTypes from 'prop-types';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Right, Body, Icon, ActionSheet } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';

import { activeColor, disabledColor, secondaryColor, simpleColor } from 'colors';
import { invitationalSMS } from 'utils';

class UserContactsListItem extends React.PureComponent {
  user = this.props.contact.user;

  openMore = () => {
    const { t } = this.props;
    const blockOrUnblockActionName = this.props.contact.is_blocked
      ? t('profile.actions.unblock')
      : t('profile.actions.block');
    const actions = this.user
      ? [t('profile.actions.searchAds'), blockOrUnblockActionName, t('actions.cancel')]
      : [t('profile.actions.searchAds'), blockOrUnblockActionName, t('actions.invite'), t('actions.cancel')];
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
    const { t, contact } = this.props;

    if (this.user) {
      return;
    }

    invitationalSMS(contact.phone, t('profile.inviteFriendSMSText'));
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
          style={contact.is_blocked ? [styles.mainContainer, styles.blockedUser] : styles.mainContainer}
        >
          <Left>
            <UserAvatar
              size={48}
              name={contact.name || this.user?.name || ''}
              src={this.user?.avatar}
              bgColor={this.user ? activeColor : simpleColor}
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

export default withTranslation()(UserContactsListItem);

UserContactsListItem.propTypes = {};

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: secondaryColor,
  },
  contactPhoneStyle: {
    fontSize: 12,
    color: simpleColor,
  },
  blockedUser: {
    opacity: 0.2,
  },
});
