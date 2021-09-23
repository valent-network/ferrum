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

import Clipboard from '@react-native-community/clipboard';
import { TouchableOpacity, Image, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import { updateUserName, updateUserAvatar, getProfile } from './profileActions';
import { initiateSystemChatRoom } from '../Chat/chatActions';

import SetReferrerModal from './SetReferrerModal';

import { signOut } from '../actions/sessionsActions';

import { deleteContacts } from '../UserContacts/userContactsActions';

import { onTosPress, onPrivacyPress, onReferralInfoPress, notification as UINotification } from '../Utils';

import { activeColor, lightColor, disabledColor, secondaryColor, deletedColor, primaryColor } from '../Colors';

class ProfileScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { header: () => null };
  };

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
    const avatarPresent = this.props.user.avatar && this.props.user.avatar.length > 0;

    ActionSheet.show(
      {
        title: 'Изменить фото профиля',
        options: avatarPresent
          ? ['Выбрать из галереи...', 'Удалить', 'Отменить']
          : ['Выбрать из галереи...', 'Отменить'],
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

  confirmDeleteContacts = () =>
    ActionSheet.show(
      {
        title:
          'Уверены, что хотите удалить контакты с серверов Рекарио? Чтобы их восстановить, просто перезапустите приложение',
        options: ['Удалить', 'Отменить'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => buttonIndex === 0 && this.props.deleteContacts(),
    );

  confirmSignOut = () =>
    ActionSheet.show(
      {
        title: 'Выход из приложения',
        options: ['Выйти', 'Отменить'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => buttonIndex === 0 && this.props.onSignOut(),
    );

  refreshControl = (<RefreshControl refreshing={false} tintColor={lightColor} onRefresh={this.props.onRefresh} />);

  openSetReferrerModal = () => this.setState({ referrerModalVisible: true });
  closeSetReferrerModal = () => {
    this.props.onRefresh();
    this.setState({ referrerModalVisible: false });
  };

  copyRefcode = () => {
    Clipboard.setString(this.props.user.refcode);
    UINotification.ref.show({ message: 'Пригласительный код скопирован' });
  };

  render() {
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
              Изменить
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            <View>
              <List>
                <ListItem noIndent style={styles.itemContainer}>
                  <Item style={styles.nameInputWrapper}>
                    <Label style={styles.label}>Имя</Label>
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
                  onPress={this.copyRefcode}>
                  <Left>
                    <Text>Пригласительный код</Text>
                  </Left>
                  <Text style={styles.disabledText}>{user.refcode}</Text>
                  <Icon style={styles.copyButton} name="copy" />
                </ListItem>
                <ListItem
                  style={[styles.itemContainer, styles.withBorderBottom]}
                  noIndent
                  activeOpacity={1}
                  underlayColor="transparent">
                  <Left>
                    <Text>Телефон</Text>
                  </Left>
                  <Text style={styles.disabledText}>{user.phoneNumber}</Text>
                </ListItem>

                {!user.referrer.refcode && (
                  <Button style={styles.referrerButton} onPress={this.openSetReferrerModal} block>
                    <Text>Ввести пригласительный код</Text>
                  </Button>
                )}

                {user.referrer.refcode && (
                  <React.Fragment>
                    <ListItem
                      style={[styles.itemContainer, styles.withBorderBottom]}
                      noIndent
                      activeOpacity={1}
                      underlayColor="transparent">
                      <Left>
                        <Text>Меня пригласил</Text>
                      </Left>
                      <Right>
                        <Text style={styles.disabledText}>{user.referrer.refcode}</Text>
                      </Right>
                    </ListItem>
                    {user.referrer && (
                      <React.Fragment>
                        <Text style={styles.noteText}>
                          {user.referrer.contact_name || user.referrer.name || 'Имя не указано'}
                          &nbsp;
                          {user.referrer.phone}
                        </Text>
                        <Text style={[styles.noteText, { color: activeColor }]} onPress={onReferralInfoPress}>
                          <Text style={styles.noteText}>Читайте подробнее о том, что это даст лично вам,</Text>
                          &nbsp;здесь.
                        </Text>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}

                <ListItem
                  style={[styles.itemContainer, styles.withBorderBottom]}
                  noIndent
                  onPress={this.confirmDeleteContacts}
                  activeOpacity={1}
                  underlayColor="transparent">
                  <Left>
                    <Text>Книга контактов</Text>
                  </Left>
                  <Right>
                    <Text style={styles.activeColor}>Удалить</Text>
                  </Right>
                </ListItem>
                <Text style={styles.noteText}>
                  Не забудьте отключить доступ к контактам в настройках телефона, чтобы они не были синхронизированы
                  снова после удаления.
                </Text>
                <ListItem
                  style={[styles.itemContainer, styles.withBorderBottom]}
                  noIndent
                  onPress={() => this.props.navigation.push('InviteFriendsScreen')}
                  activeOpacity={1}
                  underlayColor="transparent">
                  <Left>
                    <Text>Пригласить друзей</Text>
                  </Left>
                  <Right>
                    <Icon name="chevron-forward-outline" />
                  </Right>
                </ListItem>
                <Text style={styles.noteText}>
                  Чем больше друзей в Рекарио — тем больше пользы вы получаете. Даже если друзья лично не заинтересованы
                  в покупке или продаже авто, у них могут быть друзья, у которых вы можете захотеть купить машину.
                </Text>
              </List>
            </View>
            <View>
              <List>
                <ListItem
                  noIndent
                  onPress={onInitiateSystemChatRoom}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={styles.itemContainer}>
                  <Left>
                    <Text style={styles.bottomLinks}>Написать в техподдержку</Text>
                  </Left>
                  <Right>
                    <Icon name="chatbubbles-outline" />
                  </Right>
                </ListItem>
                <ListItem
                  noIndent
                  onPress={onTosPress}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={styles.itemContainer}>
                  <Left>
                    <Text style={styles.bottomLinks}>Условия использования</Text>
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
                  style={styles.itemContainer}>
                  <Left>
                    <Text style={styles.bottomLinks}>Политика конфиденциальности</Text>
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
                  style={[styles.itemContainer, styles.withBorderBottom]}>
                  <Left>
                    <Text>Выход</Text>
                  </Left>
                  <Right>
                    <Icon name="log-out-outline" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

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
    color: activeColor,
  },
  nameInput: {
    color: lightColor,
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
});
