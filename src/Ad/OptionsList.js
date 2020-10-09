import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Text, View, Icon } from 'native-base';

export default class OptionsList extends React.PureComponent {
  goToAdSource = () => Linking.openURL(this.props.ad.url)
  render() {
    const { options } = this.props.ad;

    return (
      <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 12, marginBottom: 12}}>
        {Object.keys(options).map((opt, index) => (
          <Text key={index} style={styles.optionContainer} >{options[opt][0]}: {options[opt][1]}</Text>
        ))}
        <Text style={styles.optionContainer} onPress={this.goToAdSource}>
          Источник&nbsp;<Icon name='ios-open-outline' style={styles.sourceIcon}/>
        </Text>
      </View>
    );
  }
}


OptionsList.propTypes = {
  ad: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  optionContainer: {
    borderWidth: 1,
    borderColor: '#666',
    margin: 4,
    borderRadius: 4,
    fontSize: 14,
    padding: 6
  },
  sourceIcon: {
    fontSize: 15,
    lineHeight: 20
  }
})