import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { FlatList, SafeAreaView, RefreshControl, StyleSheet } from 'react-native';

import { Text, Container, Content, List, Spinner } from 'native-base';

import ChatRoomListItem from './ChatRoomListItem';

import { lightColor, spinnerColor } from '../Colors';

import { getChatRooms } from './chatActions';

import ListNotFound from '../ListNotFound';

function ChatRoomsListScreen({ chats, isLoading, getChatRoomsWithOffset }) {
  const keyExtractor = useCallback((item) => item?.id?.toString(), []);

  const onEndReached = useCallback(() => {
    getChatRoomsWithOffset(chats.length);
  }, []);

  const renderItem = ({ item, index }) => <ChatRoomListItem chat={item} />;

  if (chats.length === 0) {
    return isLoading ? (
      <Container>
        <Content>
          <Spinner color={spinnerColor} />
        </Content>
      </Container>
    ) : (
      <ListNotFound
        refreshControl={<RefreshControl refreshing={isLoading} tintColor={lightColor} onRefresh={onEndReached} />}
      />
    );
  }

  return (
    <Container>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getChatRoomsWithOffset: (offset) => dispatch(getChatRooms(offset)),
  };
}

ChatRoomsListScreen.navigationOptions = ({ navigation }) => {
  return { title: 'Чаты', headerShown: false };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomsListScreen);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
