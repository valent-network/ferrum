import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';

import { ad as styles } from '../Styles';

export default class OptionsList extends React.PureComponent {
  render() {
    const { prices, price, options, url } = this.props.ad;

    return (
      <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 12, marginBottom: 12}}>


        {Object.keys(options).map((opt, index) => (
          <Text key={index} style={{borderWidth: 1, borderColor: '#fff', margin: 4, borderRadius: 2, fontSize: 12, padding: 6}} >{options[opt][0]}: {options[opt][1]}</Text>
        ))}

      </View>
    );
  }
}


OptionsList.propTypes = {
  ad: PropTypes.object.isRequired,
};
