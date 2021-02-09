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
  Thumbnail,
  Left,
  Right,
  Body,
  Icon,
  View,
  ActionSheet,
  Item,
  Label,
} from 'native-base';

import { TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import { updateUserName, updateUserAvatar, getProfile } from './profileActions';
import { initiateSystemChatRoom } from '../Chat/chatActions';

import { signOut } from '../actions/sessionsActions';

import { deleteContacts } from '../UserContacts/userContactsActions';

import { onTosPress, onPrivacyPress } from '../Utils';

import { activeColor, lightColor, mainColor, disabledColor } from '../Colors';

class ProfileScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return { header: () => null };
  };

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
          'Уверен, что хочешь удалить контакты с серверов Рекарио? Чтобы их восстановить, просто перезапусти приложение',
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

  refreshControl = (<RefreshControl refreshing={false} tintColor={activeColor} onRefresh={this.props.onRefresh} />);

  render() {
    const { onRefresh, onInitiateSystemChatRoom, user } = this.props;

    return (
      <Container>
        <Content refreshControl={this.refreshControl} contentContainerStyle={styles.contentStyle}>
          <View style={styles.userInfoContainer}>
            <TouchableOpacity onPress={this.onAvatarPress}>
              {user.avatar ? (
                <Thumbnail source={{ uri: user.avatar }} />
              ) : (
                <Image style={styles.noAvatar} source={require('../assets/default_avatar.png')} />
              )}
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
                    <Label>Имя</Label>
                    <Input style={styles.nameInput} defaultValue={user.name} onEndEditing={this.handleNameChange} />
                  </Item>
                </ListItem>
                <ListItem style={styles.itemContainer} noIndent activeOpacity={1} underlayColor="transparent">
                  <Left>
                    <Text>Телефон</Text>
                  </Left>
                  <Text style={styles.phoneNumberText}>{user.phoneNumber}</Text>
                </ListItem>
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
                  Не забудь отключить доступ к контактам в настройках телефона, чтобы они не были синхронизированы снова
                  после удаления.
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
                    <Icon name="open-outline" />
                  </Right>
                </ListItem>
                <ListItem
                  noIndent
                  onPress={onPrivacyPress}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={styles.itemContainer}>
                  <Left>
                    <Text style={styles.bottomLinks}>Политика конфеденциальности</Text>
                  </Left>
                  <Right>
                    <Icon name="open-outline" />
                  </Right>
                </ListItem>
                <ListItem
                  noIndent
                  onPress={this.confirmSignOut}
                  activeOpacity={1}
                  underlayColor="transparent"
                  style={styles.itemContainer}>
                  <Left>
                    <Text style={styles.activeColor}>Выход</Text>
                  </Left>
                  <Right>
                    <Icon name="log-out-outline" style={styles.activeColor} />
                  </Right>
                </ListItem>
              </List>
            </View>
          </View>
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
  noAvatar: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  contentStyle: {
    flexGrow: 1,
  },
  optionsContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  phoneNumberText: {
    color: disabledColor,
  },
  noteText: {
    fontSize: 12,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: mainColor,
    borderTopColor: disabledColor,
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
  },
  withBorderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: disabledColor,
  },
  changeAvatarButton: {
    marginTop: 12,
  },
  nameInputWrapper: {
    borderBottomWidth: 0,
  },
});
