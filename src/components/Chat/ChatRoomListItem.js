import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Image, Animated } from 'react-native';

import Navigation from 'services/Navigation';

import UserAvatar from 'react-native-user-avatar';

import { Text, ListItem, Left, Body, Right, Badge, ActionSheet } from 'native-base';

import dayjs from 'dayjs';

import { useTranslation } from 'react-i18next';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import {
  activeColor,
  disabledColor,
  secondaryColor,
  superActiveColor,
  textColor,
  activeTextColor,
  deletedColor,
  primaryColor,
} from 'colors';

import { leaveChat } from 'actions/chat';

import RECARIO_LOGO from 'assets/logo.png';

export default function ChatRoomListItem({ chat, currentUser }) {
  const swipeableRef = useRef({});
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const lastMessage = chat.messages[0];
  const onPress = () => Navigation.navigate('ChatRoomScreen', { chatRoomId: chat.id, title: chat.title });

  let lastMessageDateString = dayjs(dayjs().startOf('day')).isBefore(lastMessage.createdAt)
    ? dayjs(lastMessage.createdAt).locale(i18n.language).format('HH:mm')
    : dayjs(lastMessage.createdAt).locale(i18n.language).format('D MMM');
  lastMessageDateString =
    dayjs().year() === parseInt(dayjs(lastMessage.createdAt).format('YYYY'))
      ? lastMessageDateString
      : `${lastMessageDateString} ${dayjs(lastMessage.createdAt).format('YYYY')}`;
  let messagePreview = lastMessage ? lastMessage.text.replace(/\n/g, ' ') : '';
  messagePreview = messagePreview.length > 20 ? `${messagePreview.substring(0, 20)}...` : messagePreview;

  const onLeave = useCallback(() => {
    const msg = lastMessage.user?._id ? `${lastMessage.user.name}: ${messagePreview}` : messagePreview;
    const title = chat.system ? t('chat.actions.systemChatHeader') : `${chat.title}\n${lastMessageDateString} – ${msg}`;

    ActionSheet.show(
      {
        title: title,
        options: [t('chat.actions.leave'), t('chat.actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        buttonIndex === 0 && dispatch(leaveChat(chat.id)) && swipeableRef.current?.close();
      },
    );
  }, [chat.id]);

  const renderLeftActions = useCallback(
    (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
      });
      return (
        <RectButton style={styles.leftAction} onPress={onLeave}>
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          >
            {t('chat.actions.leave')}
          </Animated.Text>
        </RectButton>
      );
    },
    [chat.id],
  );

  return (
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      ref={(ref) => (swipeableRef.current = ref)}
      renderLeftActions={renderLeftActions}
    >
      <ListItem
        noBorder
        noIndent
        thumbnail
        activeOpacity={1}
        underlayColor="transparent"
        onPress={onPress}
        style={styles.chatRow}
      >
        <Left>
          {chat.system ? (
            <Image source={RECARIO_LOGO} style={styles.systemLogoImage} />
          ) : (
            <UserAvatar size={48} name={chat.title || ''} src={chat.photo} bgColor={activeColor} />
          )}
        </Left>
        <Body style={styles.previewBody}>
          <Text style={styles.title}>{chat.system ? t('chat.systemChatTitle') : chat.title}</Text>
          <Text style={styles.textColor}>
            {lastMessage?.user?._id &&
              (lastMessage.user._id === currentUser._id ? t('chat.you') : lastMessage.user.name)}
          </Text>

          <Text style={styles.smallFont}>{messagePreview}</Text>
        </Body>
        <Right style={styles.notes}>
          <Text style={[styles.smallFont, styles.centered]}>{lastMessageDateString}</Text>
          {chat.new_messages_count > 0 && (
            <Badge style={styles.unreadBadge}>
              <Text style={styles.activeTextColor}>{chat.new_messages_count}</Text>
            </Badge>
          )}
        </Right>
      </ListItem>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  systemLogoImage: {
    width: 48,
    height: 48,
    borderColor: superActiveColor,
    borderWidth: 1,
    borderRadius: 24,
  },
  previewBody: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  textColor: { color: textColor },
  activeTextColor: { color: activeTextColor },
  unreadBadge: {
    backgroundColor: activeColor,
    transform: [{ scale: 0.6 }],
    alignItems: 'center',
  },
  chatRow: {
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: secondaryColor,
    flex: 1,
    backgroundColor: primaryColor,
  },
  centered: {
    alignSelf: 'center',
  },
  smallFont: {
    color: textColor,
    fontSize: 13,
  },
  title: {
    fontWeight: 'bold',
    color: textColor,
  },
  notes: {
    paddingTop: 6,
    paddingLeft: 2,
    paddingRight: 6,
    paddingBottom: 2,
    justifyContent: 'space-between',
  },

  leftAction: {
    backgroundColor: deletedColor,
    justifyContent: 'center',
    flex: 1,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
});
