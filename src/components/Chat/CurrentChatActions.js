import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import UserAvatar from 'react-native-user-avatar';

import { Thumbnail, Spinner } from 'native-base';
import { TouchableOpacity, View } from 'react-native';

import Navigation from 'services/Navigation';
import { activeColor } from 'colors';

const HeaderActions = ({ chat, isLoading }) => {
  if (isLoading || chat.system || !chat.ad_id) {
    return null;
  }

  onPress = () => Navigation.push('ChatRoomSettingsScreen', { chat: chat });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.carPhoto}>
        <UserAvatar size={36} name={chat.title || ''} src={chat.photo} bgColor={activeColor} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActions);

const styles = StyleSheet.create({
  carPhoto: {
    marginRight: 18,
  },
});
