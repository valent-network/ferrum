import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { FlatList, SafeAreaView, RefreshControl, StyleSheet } from 'react-native';

import { Text, Container, Content, List, Spinner } from 'native-base';

import ChatRoomListItem from './ChatRoomListItem';

import { textColor, spinnerColor, secondaryColor, primaryColor } from 'colors';

import { getChatRooms } from 'actions/chat';

import ListNotFound from 'components/ListNotFound';

import i18n from 'services/i18n';

function ChatRoomsListScreen({ chats, isLoading, getChatRoomsWithOffset, currentUser }) {
  const keyExtractor = useCallback((item) => item?.id?.toString(), []);

  const onEndReached = useCallback(() => {
    getChatRoomsWithOffset(chats.length);
  }, []);

  const renderItem = ({ item, index }) => <ChatRoomListItem chat={item} currentUser={currentUser} />;

  const refreshControl = <RefreshControl refreshing={isLoading} tintColor={spinnerColor} onRefresh={onEndReached} />;

  if (chats.length === 0) {
    return isLoading ? (
      <Container style={{ backgroundColor: primaryColor }}>
        <Content>
          <Spinner color={spinnerColor} />
        </Content>
      </Container>
    ) : (
      <ListNotFound refreshControl={refreshControl} />
    );
  }

  return (
    <Container style={{ backgroundColor: primaryColor }}>
      <SafeAreaView style={styles.safeContainer}>
        <FlatList
          data={chats}
          refreshing={isLoading}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    chats: state.chats.list,
    isLoading: state.chats.isLoading,
    currentUser: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getChatRoomsWithOffset: (offset) => dispatch(getChatRooms(offset)),
  };
}

ChatRoomsListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerShown: true,
    headerTitleStyle: { color: textColor },
    headerTintColor: textColor,
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    title: i18n.t('nav.titles.chats'),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomsListScreen);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
