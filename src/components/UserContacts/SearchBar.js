import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Item, Icon, Input, Text, Left, Right, View } from 'native-base';
import { withTranslation } from 'react-i18next';

import { updateQuery } from 'actions/userContacts';

import { disabledColor, secondaryColor, primaryColor, textColor } from 'colors';

class SearchBar extends React.PureComponent {
  typingTimer = null;
  resetQuery = () => this.props.updateQuery('');

  render() {
    const { t, updateQuery, query } = this.props;
    const onUpdateQuery = (query) => {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => updateQuery(query), 200);
    };

    return (
      <Item style={styles.searchBar}>
        <Icon name="ios-search" style={styles.searchIcon} />
        <Input
          placeholder={t('profile.placeholders.userContactsSearch')}
          placeholderTextColor={disabledColor}
          style={[styles.inputTextColor, styles.searchBarInput]}
          onChangeText={onUpdateQuery}
          defaultValue={query}
          returnKeyType={'done'}
        />
        {query.length > 0 && <Icon name="close-circle" style={styles.resetIcon} onPress={this.resetQuery} />}
      </Item>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.userContacts.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateQuery: (query) => dispatch(updateQuery(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SearchBar));

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 16,
    marginLeft: 8,
    backgroundColor: primaryColor,
    marginTop: Platform.OS === 'android' ? 32 : 0,
    alignSelf: Platform.OS === 'android' ? 'flex-end' : 'center',
  },
  searchIcon: {
    color: disabledColor,
    fontSize: 14,
  },
  searchBarInput: {
    fontSize: 14,
    paddingLeft: 0,
  },
  inputTextColor: {
    color: textColor,
  },
  resetIcon: { color: disabledColor, fontSize: 14 },
});
