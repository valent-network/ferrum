import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Icon, Badge, Text, Button, FooterTab } from 'native-base';

import { activeColor } from 'colors';

import Navigation from 'services/Navigation';

const BottomTabChatIcon = ({ tintColor, unreadMessagesCount }) => {
  const icon = <Icon name="chatbubble" style={[styles.activeIcon, { color: tintColor }]} />;

  if (unreadMessagesCount === 0) {
    return icon;
  }

  return (
    <FooterTab style={styles.footerTab}>
      <Button badge vertical activeOpacity={1} onPress={() => Navigation.navigate('ChatRoomsListScreen')}>
        <Badge style={styles.badge}>
          <Text>{unreadMessagesCount}</Text>
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
    backgroundColor: activeColor,
  },
  footerTab: {
    backgroundColor: 'transparent', // for Android,
    padding: 0,
    margin: 0,
  },
});
