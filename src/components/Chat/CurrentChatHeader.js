import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { View, Text, Spinner, Title, Subtitle } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { decOfNum } from 'utils';
import { spinnerColor, textColor } from 'colors';

import Navigation from 'services/Navigation';

const HeaderTitle = ({ chat, isLoading, navigation }) => {
  if (isLoading || typeof chat.id === 'undefined' || !chat.id) {
    return <Spinner color={spinnerColor} />;
  }

  const { t } = useTranslation();
  const chatRoomUsersCount = chat.chat_room_users?.length || 0;
  const membersWord = decOfNum(chatRoomUsersCount, [t('chat.oneMember'), t('chat.twoMembers'), t('chat.threeMembers')]);
  onPress = () => Navigation.push('ChatRoomSettingsScreen', { chat: chat });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.centered}>
        <Title style={{ color: textColor }} numberOfLines={1}>
          {chat.system ? t('chat.systemChatTitle') : chat.title}
        </Title>
        {chatRoomUsersCount > 0 && !chat.system && (
          <Subtitle style={{ color: textColor }}>
            {chatRoomUsersCount} {membersWord}
          </Subtitle>
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
