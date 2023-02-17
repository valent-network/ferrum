import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { FlatList, SafeAreaView, RefreshControl, StyleSheet } from 'react-native';

import { Text, Container, Content, Spinner } from 'native-base';

import ChatRoomListItem from './ChatRoomListItem';

import { spinnerColor, primaryColor } from 'colors';

import { getChatRooms } from 'actions/chat';

import ListNotFound from 'components/ListNotFound';

import i18n from 'services/i18n';

function ChatRoomsListScreen({ chats, isLoading, getChatRoomsWithOffset, currentUser }) {
  const keyExtractor = useCallback((item) => item?.id?.toString());

  const onEndReached = useCallback(() => {
    getChatRoomsWithOffset(chats.length);
  }, [chats.length]);

  const onRefresh = useCallback(() => {
    getChatRoomsWithOffset(0);
  });

  const renderItem = useCallback(
    ({ item, index }) => <ChatRoomListItem chat={item} currentUser={currentUser} />,
    [currentUser],
  );

  if (chats.length === 0) {
    return isLoading ? (
      <Container style={styles.mainContainer}>
        <Content>
          <Spinner color={spinnerColor} />
        </Content>
      </Container>
    ) : (
      <ListNotFound
        refreshControl={<RefreshControl refreshing={isLoading} tintColor={spinnerColor} onRefresh={onRefresh} />}
      />
    );
  }

  return (
    <Container style={styles.mainContainer}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomsListScreen);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: primaryColor,
  },
});
