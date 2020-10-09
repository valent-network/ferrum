import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Item, Icon, Input, Text, Fab } from 'native-base';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';

import UserContactsList from './UserContactsList';

import { loadMoreUserContacts, getAll, updateQuery } from './userContactsActions';

import { filterByContact } from '../Feed/feedActions';

import ContactsUploading from '../Feed/ContactsUploading';

import CSS from '../Styles';

class UserContactsScreen extends React.PureComponent {
  typingTimer = null;
  static navigationOptions = ({ navigation }) => {
    return({ header: () => null });
  }

  resetQuery = () => this.props.updateQueryDispatched('')

  render() {
    const { userContacts, isLoading, query, updateQueryDispatched, loadMoreUserContactsDispatched, onRefreshDispatched, filterByContactDispatched, userContactsAreUploading, userContactsMissing } = this.props;
    // TODO: Ugly
    const showInitialProcessing = !isLoading &&
                                  userContactsMissing &&
                                  userContactsAreUploading;
    const onUpdateQuery = (query) => {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => updateQueryDispatched(query), 200);
    }

    return (
      <Container>
        <Header style={styles.mainHeader} iosBarStyle={'light-content'} searchBar>
          <Item style={{borderRadius: 8, backgroundColor: '#111', marginTop: (Platform.OS === 'android' ? 16 : 0)}}>
            <Icon name='ios-search' style={{color: CSS.activeColor}}/>
            <Input placeholder='Имя...' style={styles.activeColor} onChangeText={onUpdateQuery} defaultValue={query}/>
            {query.length > 0 && <Icon name='close-circle-outline' style={styles.activeColor} onPress={this.resetQuery}/>}
          </Item>
        </Header>
        {showInitialProcessing ?
          <ContactsUploading />
          :
          <UserContactsList
            userContacts={userContacts}
            filterByContactDispatched={filterByContactDispatched}
            isLoading={isLoading}
            loadMoreUserContactsDispatched={loadMoreUserContactsDispatched}
            onRefresh={onRefreshDispatched}/>
        }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userContacts: state.userContacts.list,
    userContactsAreUploading: state.userContacts.isUploading,
    userContactsMissing: (state.userContacts.list.length === 0 && state.userContacts.query.length === 0),
    query: state.userContacts.query,
    isLoading: state.userContacts.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContactsDispatched: () => dispatch(loadMoreUserContacts()),
    onRefreshDispatched: () => dispatch(getAll()),
    filterByContactDispatched: (name) => dispatch(filterByContact(name)),
    updateQueryDispatched: (query) => dispatch(updateQuery(query))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContactsScreen);

UserContactsScreen.propTypes = {
};

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: CSS.mainColor,
    borderBottomWidth: 0,
    paddingBottom: 16
  },
  activeColor: {
    color: CSS.activeColor
  },
});
