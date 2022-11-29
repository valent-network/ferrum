import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Text, View, Icon } from 'native-base';
import { withTranslation } from 'react-i18next';

import { secondaryColor } from '../Colors';

class OptionsList extends React.PureComponent {
  goToAdSource = () => Linking.openURL(this.props.ad.url);
  render() {
    const { t } = this.props;
    const { url, options } = this.props.ad;
    return (
      <View style={styles.mainContainer}>

        {options && Object.keys(options).map((opt, index) => (
          <Text key={index} style={styles.optionContainer}>
            {options[opt][0]}: {options[opt][1]}
          </Text>
        ))}

        {url && <Text style={styles.optionContainer} onPress={this.goToAdSource}>
          {t('ad.options.source')}&nbsp;
          <Icon name="ios-open-outline" style={styles.sourceIcon} />
        </Text>}
      </View>
    );
  }
}

export default withTranslation()(OptionsList);

OptionsList.propTypes = {
  ad: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 12,
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: secondaryColor,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 4,
    fontSize: 14,
    padding: 6,
  },
  sourceIcon: {
    fontSize: 15,
    lineHeight: 20,
  },
});
