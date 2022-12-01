import React from 'react';
import { connect } from 'react-redux';
import { Text, Content, List, ListItem, Radio, Left, Right, Container } from 'native-base';
import { Share, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import UserContactsList from '../UserContacts/UserContactsList';

import UsersListItem from './UsersListItem';

import { loadMoreUserContacts, getAll } from '../UserContacts/userContactsActions';

import { primaryColor, lightColor, activeColor, secondaryColor } from '../Colors';

import i18n from '../../i18n';

function LanguageScreen({ isLoading, userContacts, loadMoreUserContacts, onRefresh }) {

  return (
    <Container>
      <Content>
        <List>
          <ListItem first selected>
            <Left><Text>🇺🇦 Українська</Text></Left>
            <Right><Radio selected={true} /></Right>
          </ListItem>
          <ListItem last>
            <Left><Text>🇬🇧 English</Text></Left>
            <Right><Radio selected={false} /></Right>
          </ListItem>
        </List>
        
        
      </Content>
    </Container>
  )
}

LanguageScreen.navigationOptions = ({ navigation }) => {

  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      borderWidth: 0,
      borderBottomColor: primaryColor,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTitle: i18n.t('nav.titles.language'),
    headerTitleStyle: { color: lightColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: lightColor,
  };
};

function mapStateToProps(state) {
  return {
    userContacts: state.userContacts.list.filter((u) => !u.user),
    isLoading: state.userContacts.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMoreUserContacts: () => dispatch(loadMoreUserContacts()),
    onRefresh: () => dispatch(getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);

const styles = StyleSheet.create({
});
