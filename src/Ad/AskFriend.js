import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, H3 } from 'native-base';

export default class AskFriend extends React.PureComponent {
  render() {
    if(!this.props.currentAdFriends) { return(null) }

    const currentAdFriends = this.props.currentAdFriends;
    const notHand1FriendsOfFriends = currentAdFriends.filter(friend => friend.idx > 1);
    const direct_friend = currentAdFriends.filter(friend => friend.idx === 1)[0];
    const hasMutualFriends = (currentAdFriends.length > 1 && direct_friend) || (!direct_friend && currentAdFriends.length > 0);

    return (
      <View>
        {direct_friend && <Text>Разместил(а) {direct_friend.name}</Text>}

        {hasMutualFriends && notHand1FriendsOfFriends &&
          <View>
            <H3>Общие друзья</H3>
            {notHand1FriendsOfFriends.map(f => <Text key={f.id}>{f.name}</Text>)}
          </View>
        }
      </View>
    );
  }
}

AskFriend.propTypes = {
  ad: PropTypes.object.isRequired,
};
