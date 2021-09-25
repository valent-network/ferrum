import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Icon, Badge, Text, Button, FooterTab } from 'native-base';

import { activeColor, disabledColor } from '../Colors';

import NavigationService from '../services/NavigationService';

const ChatIcon = ({ unreadMessagesCount }) => {
  const icon = <Icon name="chatbubbles-outline" style={styles.activeIcon} />;

  if (unreadMessagesCount === 0) {
    return icon;
  }

  return (
    <FooterTab style={styles.footerTab}>
      <Button badge vertical activeOpacity={1} onPress={() => NavigationService.navigate('ChatRoomsListScreen')}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatIcon);

const styles = StyleSheet.create({
  activeIcon: {
    fontSize: 24,
    color: activeColor,
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
