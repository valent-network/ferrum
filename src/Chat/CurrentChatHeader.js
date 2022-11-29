import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { View, Text, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { decOfNum } from '../Utils';
import { spinnerColor } from '../Colors';

import NavigationService from '../services/NavigationService';

const HeaderTitle = ({ chat, isLoading, navigation }) => {
  if (!chat.id) {
    return null;
  }

  const { t } = useTranslation();
  const chatRoomUsersCount = chat.chat_room_users?.length || 0;
  const membersWord = decOfNum(chatRoomUsersCount, [t('chat.oneMember'), t('chat.twoMembers'), t('chat.threeMembers')]);
  onPress = () => NavigationService.push('ChatRoomSettingsScreen', { chat: chat });

  if (isLoading) {
    return <Spinner color={spinnerColor} />;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.centered}>
        <Text numberOfLines={1}>{chat.system ? t('chat.systemChatTitle') : chat.title}</Text>
        {chatRoomUsersCount > 0 && !chat.system && (
          <Text>
            {chatRoomUsersCount} {membersWord}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    chat: state.currentChat.chatMetaData,
    isLoading: state.currentChat.isLoadingSettings,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTitle);

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
});
