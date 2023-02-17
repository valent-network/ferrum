import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, SafeAreaView, RefreshControl, StyleSheet } from 'react-native';

import { Text, Container, Content, Spinner, Title } from 'native-base';

import AdminChatRoomListItem from './AdminChatRoomListItem';

import { spinnerColor, primaryColor, secondaryColor, textColor } from 'colors';

import { getAdminChatRooms } from 'actions/adminChat';

import ListNotFound from 'components/ListNotFound';

import i18n from 'services/i18n';

function AdminChatRoomsListScreen({ chats, isLoading, getChatRoomsWithOffset, currentUser }) {
  const keyExtractor = useCallback((item) => item?.id?.toString());

  const onEndReached = useCallback(() => {
    getChatRoomsWithOffset(chats.length);
  }, [chats.length]);

  const onRefresh = useCallback(() => {
    getChatRoomsWithOffset(0);
  });

  useEffect(onRefresh, []);

  const renderItem = useCallback(
    ({ item, index }) => <AdminChatRoomListItem chat={item} currentUser={currentUser} />,
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

AdminChatRoomsListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTitle: () => <Title style={styles.title}>SYSTEM</Title>,
    headerTitleStyle: { color: textColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: textColor,
  };
};

function mapStateToProps(state) {
  return {
    chats: state.adminChats.list,
    isLoading: state.adminChats.isLoading,
    currentUser: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getChatRoomsWithOffset: (offset) => dispatch(getAdminChatRooms(offset)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminChatRoomsListScreen);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: primaryColor,
  },
  title: {
    color: textColor,
  },
});
