import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { View, Text, Button } from 'native-base';

import { checkContactsPermissions, requestContactsPermissions } from '../actions/userContactsActions';

import * as ActionTypes from '../actions/actionTypes.js';

import { goToSettings } from '../Utils';

class PermissionsBox extends React.PureComponent {
  onPress = () => this.props.permissionsRequested ? goToSettings() : this.props.requestContactsPermissionsDispatched()

  componentDidMount() {
    this.props.checkContactsPermissionsDispatched();
  }
  render() {
    const { permissionsGiven, permissionsRequested, checkContactsPermissionsDispatched } = this.props;

    if (permissionsGiven && permissionsRequested) {
      return null;
    }

    return (
      <View style={styles.mainContainer}>
        <Text>
          Приложению нужен доступ к вашему списку контактов для того, чтобы вы могли найти друзей и знакомых, продающих
          машину
        </Text>
        {
          <Button full bordered light style={styles.button} onPress={this.onPress}>
            <Text>Предоставить</Text>
          </Button>
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    permissionsGiven: state.userContacts.permissionsGiven,
    permissionsRequested: state.userContacts.permissionsRequested,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkContactsPermissionsDispatched: () => dispatch(checkContactsPermissions()),
    requestContactsPermissionsDispatched: () => dispatch(requestContactsPermissions()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsBox);

PermissionsBox.propTypes = {};

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: '#500', margin: 12, padding: 12, borderColor: '#a11', borderWidth: 4 },
  button: { marginTop: 12}
})