import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Icon, Badge, Text, Button, FooterTab } from 'native-base';

import { deletedColor, activeTextColor } from 'colors';

import Navigation from 'services/Navigation';

const BottomTabChatIcon = ({ tintColor, unreadMessagesCount }) => {
  const icon = useCallback(<Icon name="chatbubbles-sharp" style={[styles.activeIcon, { color: tintColor }]} />, [
    tintColor,
  ]);
  const onPress = useCallback(() => Navigation.navigate('ChatRoomsListScreen'));

  if (unreadMessagesCount === 0) {
    return icon;
  }

  return (
    <FooterTab style={styles.footerTab}>
      <Button badge vertical activeOpacity={1} onPress={onPress}>
        <Badge style={styles.badge}>
          <Text style={styles.activeTextColor}>{unreadMessagesCount}</Text>
        </Badge>
        {icon}
      </Button>
    </FooterTab>
  );
};

function mapStateToProps(state) {
  return {
    unreadMessagesCount: state.user.unreadMessagesCount,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabChatIcon);

const styles = StyleSheet.create({
  activeIcon: {
    fontSize: 24,
  },
  badge: {
    backgroundColor: deletedColor,
  },
  footerTab: {
    backgroundColor: 'transparent', // for Android,
    padding: 0,
    margin: 0,
  },
  activeTextColor: { color: activeTextColor },
});
