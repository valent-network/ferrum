import React from 'react';
import PropTypes from 'prop-types';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Right, Body, Icon, Button } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { withTranslation } from 'react-i18next';

import { activeColor, disabledColor, primaryColor, secondaryColor } from 'colors';

import { invitationalSMS } from 'utils';

class UsersListItem extends React.PureComponent {
  render() {
    const { t, contact, onUserPress } = this.props;

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
          <Button
            style={styles.actionButton}
            onPress={() => invitationalSMS(contact.phone, t('profile.inviteFriendSMSText'))}
          >
            <Text>{t('buttons.invite')}</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default withTranslation()(UsersListItem);

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
