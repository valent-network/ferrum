import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Button } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';

import { activeColor, textColor } from 'colors';

import { initiateChatRoom } from 'actions/chat';
import InvitationModal from 'components/Chat/InvitationModal';
import FriendPickerModal from 'components/FriendPicker/FriendPickerModal';

import FriendToInvite from './FriendToInvite';
import ChatToContinue from './ChatToContinue';
import AnyFriendToInvite from './AnyFriendToInvite';

class AskFriend extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      friendPickerModalVisible: false,
      friendToInvite: {},
    };
  }

  onAsk = (userId, name) => this.props.initiateChat(this.props.ad.id, userId, name);
  openFriendPickerModal = () =>
    this.setState({ modalVisible: false, friendPickerModalVisible: true, friendToInvite: {} });
  prepareInvitation = (friend) =>
    this.setState({ modalVisible: true, friendPickerModalVisible: false, friendToInvite: friend });

  render() {
    const { t, currentAdFriends } = this.props;
    const { modalVisible, friendPickerModalVisible, friendToInvite } = this.state;
    const closeModal = () => this.setState({ modalVisible: false });
    const closeFriendPickerModal = () => this.setState({ friendPickerModalVisible: false });

    const friends = currentAdFriends.friends;
    const chats = currentAdFriends.chats;

    const direct_friend = friends.filter((friend) => friend.idx === 1)[0];

    return (
      <View>
        {direct_friend && (
          <Text style={{ color: textColor }}>
            {t('ad.postedBy')} <Text style={{ fontWeight: 'bold', color: textColor }}>{direct_friend.name}</Text>
          </Text>
        )}

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.mutualFriendsContainer}>
          <AnyFriendToInvite openFriendPickerModal={this.openFriendPickerModal} />
          {chats.map((c) => (
            <ChatToContinue chat={c} key={`chat-${c.id}`} />
          ))}
          {friends.map((f) => (
            <FriendToInvite
              friend={f}
              key={`friend-${f.id}-hops-${f.idx}`}
              prepareInvitation={this.prepareInvitation}
            />
          ))}
        </ScrollView>

        {modalVisible && <InvitationModal friend={friendToInvite} onClose={closeModal} onSubmit={this.onAsk} />}
        {friendPickerModalVisible && (
          <FriendPickerModal onClose={closeFriendPickerModal} onUserPress={this.prepareInvitation} />
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    initiateChat: (adId, userId, name) => dispatch(initiateChatRoom(adId, userId, name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AskFriend));

AskFriend.propTypes = {
  ad: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  mutualFriendsContainer: {
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
  },
});
