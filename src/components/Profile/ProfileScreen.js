import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  Container,
  Content,
  Button,
  List,
  ListItem,
  Input,
  Form,
  Left,
  Right,
  Body,
  Icon,
  View,
  ActionSheet,
  Item,
  Label,
} from 'native-base';

import UserAvatar from 'react-native-user-avatar';

import Clipboard from '@react-native-clipboard/clipboard';
import { Platform, TouchableOpacity, Image, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import { withTranslation } from 'react-i18next';

import { updateUserName, updateUserAvatar, getProfile } from 'actions/profile';
import { initiateSystemChatRoom } from 'actions/chat';

import SetReferrerModal from './SetReferrerModal';

import { signOut } from 'actions/sessions';

import { deleteContacts } from 'actions/userContacts';

import { goToSettings, onTosPress, onPrivacyPress, onReferralInfoPress, notification as UINotification } from 'utils';

import {
  activeColor,
  simpleColor,
  disabledColor,
  secondaryColor,
  deletedColor,
  primaryColor,
  spinnerColor,
  superActiveColor,
} from 'colors';

class ProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      referrerModalVisible: false,
    };
  }

  handleNameChange = ({ nativeEvent: { text } }) => this.props.onUserNameChanged(text);

  handleAvatarChange = () => {
    const { onUserAvatarChanged } = this.props;
    const options = {
      width: 256,
      height: 256,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      writeTempFile: false,
      mediaType: 'photo',
      forceJpg: true,
    };

    ImagePicker.openPicker(options).then((image) => {
      const source = `data:${image.mime};base64,${image.data}`;
      onUserAvatarChanged(source);
    });
  };

  onAvatarPress = () => {
    const { t } = this.props;
    const avatarPresent = this.props.user.avatar && this.props.user.avatar.length > 0;

    ActionSheet.show(
      {
        title: t('profile.actions.changeAvatarTitle'),
        options: avatarPresent
          ? [t('profile.actions.pickFromGallery'), t('actions.delete'), t('actions.cancel')]
          : [t('profile.actions.pickFromGallery'), t('actions.cancel')],
        cancelButtonIndex: avatarPresent ? 2 : 1,
        destructiveButtonIndex: avatarPresent ? 1 : null,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.handleAvatarChange();
          case 1:
            return avatarPresent ? this.handleAvatarRemove() : null;
        }
      },
    );
  };

  handleAvatarRemove = () => {
    const { onUserAvatarChanged } = this.props;

    onUserAvatarChanged('');
  };

  confirmDeleteContacts = () => {
    const { t } = this.props;

    return ActionSheet.show(
      {
        title: t('profile.actions.deleteContactsTitle'),
        options: [t('actions.delete'), t('actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => buttonIndex === 0 && this.props.deleteContacts(),
    );
  };

  confirmSignOut = () => {
    const { t } = this.props;

    return ActionSheet.show(
      {
        title: t('profile.actions.signOutTitle'),
        options: [t('profile.actions.signOut'), t('actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => buttonIndex === 0 && this.props.onSignOut(),
    );
  };

  refreshControl = (<RefreshControl refreshing={false} tintColor={spinnerColor} onRefresh={this.props.onRefresh} />);

  openSetReferrerModal = () => this.setState({ referrerModalVisible: true });
  closeSetReferrerModal = () => {
    this.props.onRefresh();
    this.setState({ referrerModalVisible: false });
  };

  copyRefcode = () => {
    const { t } = this.props;

    Clipboard.setString(this.props.user.refcode);
    UINotification.ref.show({ message: t('notifications.profile.copyRefcode') });
  };

  render() {
    const { t } = this.props;
    const { onRefresh, onInitiateSystemChatRoom, user } = this.props;
    const { referrerModalVisible } = this.state;

    return (
      <Container style={styles.mainContainer}>
        <Content refreshControl={this.refreshControl} contentContainerStyle={styles.contentStyle}>
          <View style={styles.userInfoContainer}>
            <TouchableOpacity onPress={this.onAvatarPress}>
              <UserAvatar size={48} name={user.name || ''} src={user.avatar} bgColor={activeColor} />
            </TouchableOpacity>
            <Text note style={styles.changeAvatarButton} onPress={this.onAvatarPress}>
              {t('actions.edit')}
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            <View>
              <List>
                <ListItem noIndent style={styles.itemContainer}>
                  <Item style={styles.nameInputWrapper}>
                    <Label style={styles.label}>{t('profile.labels.name')}</Label>
                    <Input
                      style={styles.nameInput}
                      defaultValue={user.name}
                      onEndEditing={this.handleNameChange}
                      returnKeyType={'done'}
                    />
                  </Item>
                </ListItem>
                <ListItem
                  style={styles.itemContainer}
                  noIndent
                  activeOpacity={1}
                  underlayColor="transparent"
                  onPress={this.copyRefcode}
                >
                  <Left>
                    <Text>{t('profile.labels.refCode')}</Text>
                  </Left>
                  <Text style={styles.disabledText}>{user.refcode}</Text>
                  <Icon style={styles.copyButton} name="copy" />
                </ListItem>
                <ListItem
                  style={[styles.itemContainer, styles.withBorderBottom]}
                  noIndent
                  activeOpacity={1}
                  underlayColor="transparent"
                >
                  <Left>
                    <Text>{t('profile.labels.phoneNumber')}</Text>
                  </Left>
                  <Text style={styles.disabledText}>{user.phoneNumber}</Text>
                </ListItem>

                {!user.referrer.refcode && (
                  <Button style={styles.referrerButton} onPress={this.openSetReferrerModal} block>
                    <Text>{t('profile.actions.enterRefCode')}</Text>
                  </Button>
                )}

                {user.referrer.refcode && (
                  <React.Fragment>
                    <ListItem
                      style={[styles.itemContainer, styles.withBorderBottom]}
                      noIndent
                      activeOpacity={1}
                      underlayColor="transparent"
                    >
                      <Left>
                        <Text>{t('profile.labels.referrer')}</Text>
                      </Left>
                      <Right>
                        <Text style={styles.disabledText}>{user.referrer.refcode}</Text>
                      </Right>
                    </ListItem>
                    {user.referrer && (
                      <View style={styles.referrerContainer}>
                        <View style={styles.referrerAvatarContainer}>
                          <UserAvatar
                            size={48}
                            name={user.referrer.contact_name || user.referrer.name || ''}
                            src={user.referrer.avatar}
                            bgColor={activeColor}
                          />
                        </View>
                        <Text style={styles.noteText}>
                          {user.referrer.contact_name || user.referrer.name || t('profile.nameNotPresent')}
                          &nbsp;
                          {user.referrer.phone}
                        </Text>
                      </View>
                    )}
                  </React.Fragment>
                )}

                <ListItem
                  style={[styles.itemContainer, styles.withBorderBottom]}
                  noIndent
                  onPress={this.confirmDeleteContacts}
                  activeOpacity={1}
                  underlayColor="transparent"
                >
                  <Left>
                    <Text>{t('profile.labels.contactsBook')}</Text>
                  </Left>
                  <Right>
                    <Text style={styles.deletedColor}>{t('actions.delete')}</Text>
                  </Right>
                </ListItem>
                <Text style={styles.noteText}>{t('profile.deleteContactsNote')}</Text>
                {Platform.OS === 'android' && (
                  <ListItem
                    style={[styles.itemContainer, styles.withBorderBottom]}
                    noIndent
                    onPress={() => this.props.navigation.push('LanguageScreen')}
                    activeOpacity={1}
                    underlayColor="transparent"
                  >
                    <Left>
                      <Text>Українська / English</Text>
                    </Left>
                    <Right>
                      <Icon name={Platform.OS === 'android' ? 'arrow-forward-outline' : 'chevron-forward-outline'} />
                    </Right>
                  </ListItem>
                )}
                <ListItem
                  style={[styles.itemContainer, styles.withBorderBottom]}
                  noIndent
                  onPress={() => this.props.navigation.push('UserContacts')}
                  activeOpacity={1}
                  underlayColor="transparent"
                >
                  <Left>
                    <Text>{t('profile.labels.friends')}</Text>
                  </Left>
                  <Right>
                    <Icon
                      style={styles.mainColor}
                      name={Platform.OS === 'android' ? 'arrow-forward-outline' : 'chevron-forward-outline'}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  style={[styles.itemContainer, styles.withBorderBottom]}
                  noIndent
                  onPress={() => this.props.navigation.push('InviteFriendsScreen')}
                  activeOpacity={1}
                  underlayColor="transparent"
                >
                  <Left>
                    <Text>{t('profile.labels.inviteFriends')}</Text>
                  </Left>
                  <Right>
                    <Icon
                      style={styles.mainColor}
                      name={Platform.OS === 'android' ? 'arrow-forward-outline' : 'chevron-forward-outline'}
                    />
                  </Right>
                </ListItem>
                <Text style={styles.noteText}>{t('profile.inviteFriendsNote')}</Text>
              </List>
            </View>
            <View>
              <List>
                <ListItem
                  noIndent
                  onPress={onInitiateSystemChatRoom}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={styles.itemContainer}
                >
                  <Left>
                    <Text style={styles.bottomLinks}>{t('profile.labels.support')}</Text>
                  </Left>
                  <Right>
                    <Icon style={styles.mainColor} name="chatbubbles-outline" />
                  </Right>
                </ListItem>
                <ListItem
                  noIndent
                  onPress={onTosPress}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={styles.itemContainer}
                >
                  <Left>
                    <Text style={styles.bottomLinks}>{t('profile.labels.tos')}</Text>
                  </Left>
                  <Right>
                    <Icon style={styles.activeColor} name="open-outline" />
                  </Right>
                </ListItem>
                <ListItem
                  noIndent
                  onPress={onPrivacyPress}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={styles.itemContainer}
                >
                  <Left>
                    <Text style={styles.bottomLinks}>{t('profile.labels.privacy')}</Text>
                  </Left>
                  <Right>
                    <Icon style={styles.activeColor} name="open-outline" />
                  </Right>
                </ListItem>
                <ListItem
                  noIndent
                  onPress={this.confirmSignOut}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={[styles.itemContainer, styles.withBorderBottom]}
                >
                  <Left>
                    <Text>{t('profile.labels.signOut')}</Text>
                  </Left>
                  <Right>
                    <Icon style={styles.deletedColor} name="log-out-outline" />
                  </Right>
                </ListItem>
              </List>
            </View>
          </View>
          {referrerModalVisible && <SetReferrerModal onClose={this.closeSetReferrerModal} />}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUserNameChanged: (name) => dispatch(updateUserName(name)),
    onUserAvatarChanged: (base64ImageData) => dispatch(updateUserAvatar(base64ImageData)),
    onSignOut: () => dispatch(signOut(false)),
    deleteContacts: () => dispatch(deleteContacts()),
    onRefresh: () => dispatch(getProfile()),
    onInitiateSystemChatRoom: () => dispatch(initiateSystemChatRoom()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProfileScreen));

ProfileScreen.propTypes = {};

styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: primaryColor,
  },
  contentStyle: {
    flexGrow: 1,
    backgroundColor: secondaryColor,
  },
  optionsContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  disabledText: {
    color: disabledColor,
  },
  noteText: {
    fontSize: 14,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: primaryColor,
    borderTopColor: secondaryColor,
    borderTopWidth: 0.5,
    borderBottomWidth: 0,
  },
  activeColor: {
    color: superActiveColor,
  },
  mainColor: {
    color: simpleColor,
  },
  deletedColor: {
    color: deletedColor,
  },
  nameInput: {
    color: simpleColor,
    fontSize: 14,
    height: '100%',
    padding: 0,
  },
  userInfoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: primaryColor,
  },
  withBorderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: secondaryColor,
  },
  changeAvatarButton: {
    marginTop: 12,
  },
  nameInputWrapper: {
    borderBottomWidth: 0,
  },
  referrerButton: {
    margin: 16,
    backgroundColor: activeColor,
  },
  copyButton: {
    fontSize: 16,
    marginLeft: 16,
    color: activeColor,
  },
  label: {
    color: disabledColor,
  },
  referrerContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  referrerAvatarContainer: {
    width: 48,
    flexWrap: 'wrap',
  },
});
