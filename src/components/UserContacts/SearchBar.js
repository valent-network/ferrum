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
        <Icon allowFontScaling={true} name="ios-search" style={styles.searchIcon} />
        <Input
          placeholder={t('profile.placeholders.userContactsSearch')}
          placeholderTextColor={disabledColor}
          style={[styles.inputTextColor, styles.searchBarInput]}
          onChangeText={onUpdateQuery}
          defaultValue={query}
          returnKeyType={'done'}
        />
        {query.length > 0 && (
          <Icon allowFontScaling={true} name="close-circle" style={styles.resetIcon} onPress={this.resetQuery} />
        )}
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
    borderRadius: 48,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: primaryColor,
    alignSelf: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  searchIcon: {
    color: disabledColor,
    fontSize: 18,
  },
  searchBarInput: {
    fontSize: 18,
  },
  inputTextColor: {
    color: textColor,
  },
  resetIcon: { color: disabledColor, fontSize: 18 },
});
