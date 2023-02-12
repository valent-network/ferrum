import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Platform, Animated, Appearance, TouchableOpacity } from 'react-native';
import { Text, View, Container, ActionSheet, Spinner, Separator, Icon, Header, Left, Right, Body } from 'native-base';
import FastImage from 'react-native-fast-image';

import { AD_IMAGE_HEIGHT } from 'utils';

import {
  activeColor,
  textColor,
  disabledColor,
  secondaryColor,
  spinnerColor,
  deletedColor,
  primaryColor,
  activeTextColor,
} from 'colors';

import { FlatList, Image, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import { getAdFriendsToChat, addUserToChat, leaveChat } from 'actions/chat';

import { mergeArraysKeepNew } from 'utils';

import InvitationModal from './InvitationModal';
import AdFriend from './AdFriend';
import ImageSlide from 'components/Ad/ImageSlide';

import i18n from 'services/i18n';
import Navigation from 'services/Navigation';

import { withAnimated, animateHeaderHelper } from 'utils';

const flatListBugFix = { right: 1 };
const AnimatedIcon = Animated.createAnimatedComponent(withAnimated(Icon));

function ChatRoomsSettingsScreen({
  chat,
  isLoading,
  friends,
  navigation,
  addUserToChat,
  leaveChat,
  getAdFriendsToChat,
}) {
  if (!chat?.id) {
    return null;
  }

  const { t } = useTranslation();
  const initializeChat = () => {
    if (chat.ad_id) {
      getAdFriendsToChat(chat.ad_id, chat.id);
    }
  };

  useEffect(initializeChat, [chat.id]);

  const [friendToInvite, setFriendToInvite] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const onShow = useCallback(() => {
    // navigation.popToTop(); // TODO: Don't know why its here, maybe it was breaking something
    navigation.navigate('Ad', { id: chat.ad_id });
  }, [chat.ad_id]);
  const onLeave = useCallback(() => {
    ActionSheet.show(
      {
        options: [t('chat.actions.leave'), t('chat.actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        title: t('chat.settings.leaveChatTitle'),
      },
      (buttonIndex) => buttonIndex === 0 && leaveChat(chat.id),
    );
  }, [chat.id]);

  const openInviteFriendModal = (friend) => {
    setFriendToInvite(friend);
    setModalVisible(true);
  };

  const friendsAndMembers = mergeArraysKeepNew([...friends, ...chat.chat_room_users], (it) => it.user_id);
  const membersIds = chat.chat_room_users.map((cru) => cru.user_id);
  const toDisplayMembers = friendsAndMembers.filter((f) => f.user_id && membersIds.includes(f.user_id));
  const toDisplayFriends = friendsAndMembers.filter((f) => !membersIds.includes(f.user_id));
  let toDisplay = toDisplayFriends.length
    ? [
        { separator: t('chat.settings.members') },
        ...toDisplayMembers,
        { separator: t('chat.settings.mayKnow') },
        ...toDisplayFriends,
      ]
    : [{ separator: t('chat.settings.members') }, ...toDisplayMembers];

  const keyExtractor = (item) => (item.separator || item.user_id || item.id).toString();
  const renderItem = ({ item }) => {
    const friendPhoneNumber = friendsAndMembers.filter((f) => f.user_id === item.user_id)[0]?.phone_number;
    return item.separator ? (
      <Text style={styles.separatorText}>{item.separator}</Text>
    ) : (
      <AdFriend
        friend={item}
        chat={chat}
        openInviteFriendModal={openInviteFriendModal}
        friendPhoneNumber={friendPhoneNumber}
      />
    );
  };
  const addUser = (userId, name) => addUserToChat(chat.id, userId, name);

  const [onScroll, setCalculatedHeaderHeight, bgInterpolation, textInterpolation] = animateHeaderHelper();

  return (
    <>
      <Animated.View
        style={[styles.headerBackground, { backgroundColor: bgInterpolation }]}
        onLayout={setCalculatedHeaderHeight}
      >
        <Header
          noShadow={true}
          iosBarStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
          style={[styles.header]}
        >
          <Left style={{ maxWidth: '20%' }}>
            <AnimatedIcon
              name={Platform.OS === 'android' ? 'arrow-back-circle-sharp' : 'chevron-back-circle-sharp'}
              style={{ color: textInterpolation }}
              onPress={() => navigation.goBack()}
            />
          </Left>
          {chat.ad_id && (
            <Body>
              <TouchableOpacity activeOpacity={1} onPress={onShow} style={{ width: '100%' }}>
                <Animated.Text style={{ color: textInterpolation, textAlign: 'center', fontWeight: 'bold' }}>
                  {chat.title}
                </Animated.Text>
                <Animated.Text
                  style={[{ color: textInterpolation, textDecorationLine: 'underline', textAlign: 'center' }]}
                >
                  {i18n.t('chat.settings.more')}
                </Animated.Text>
              </TouchableOpacity>
            </Body>
          )}
          <Right style={[styles.actionButtonsContainer, { maxWidth: '20%' }]}>
            <AnimatedIcon name="log-out-outline" style={{ color: textInterpolation }} onPress={onLeave} />
          </Right>
        </Header>
      </Animated.View>
      <ScrollView
        horizontal={false}
        scrollIndicatorInsets={flatListBugFix}
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        <ImageSlide source={{ priority: FastImage.priority.high, uri: chat.photo }} onPress={onShow} />
        {isLoading ? (
          <Spinner color={spinnerColor} />
        ) : (
          <FlatList
            nestedScrollEnabled
            data={toDisplay}
            scrollIndicatorInsets={flatListBugFix}
            refreshing={isLoading}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        )}
        {modalVisible && <InvitationModal friend={friendToInvite} onClose={closeModal} onSubmit={addUser} />}
      </ScrollView>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.currentChat.isLoadingSettings,
    friends: state.currentChat.friends,
    chat: state.currentChat.chatMetaData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAdFriendsToChat: (adId, chatRoomId) => dispatch(getAdFriendsToChat(adId, chatRoomId)),
    addUserToChat: (chatRoomId, userId, name) => dispatch(addUserToChat(chatRoomId, userId, name)),
    leaveChat: (chatRoomId) => dispatch(leaveChat(chatRoomId)),
  };
}

const styles = StyleSheet.create({
  adPhoto: {
    width: '100%',
    height: AD_IMAGE_HEIGHT,
    opacity: 0.75,
  },
  headerBackground: {
    width: '100%',
    position: 'absolute',
    zIndex: 10,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingTop: 0,
    padding: 0,
    margin: 0,
    width: '100%',
    alignItems: 'center',
  },
  leaveChat: {
    color: deletedColor,
    fontSize: 14,
    marginBottom: 16,
    paddingRight: 16,
    textAlign: 'right',
  },
  separator: {
    backgroundColor: secondaryColor,
    borderColor: disabledColor,
    height: 48,
  },
  separatorText: {
    fontSize: 18,
    color: textColor,
    marginLeft: 16,
    paddingVertical: 16,
    fontWeight: 'bold',
  },
  mainContainer: {
    backgroundColor: primaryColor,
    minHeight: '100%',
    minWidth: '100%',
  },
  activeColor: {
    color: activeColor,
  },
  activeTextColor: {
    color: activeTextColor,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomsSettingsScreen);
