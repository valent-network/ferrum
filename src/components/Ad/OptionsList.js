import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Text, View, Icon } from 'native-base';
import { withTranslation } from 'react-i18next';

import { activeColor, textColor } from 'colors';

class OptionsList extends React.PureComponent {
  goToAdSource = () => Linking.openURL(this.props.ad.url);
  render() {
    const { t } = this.props;
    const { url, options } = this.props.ad;
    return (
      <View style={styles.mainContainer}>
        {options &&
          Object.keys(options).map((opt, index) => (
            <View key={index} style={styles.optionContainer}>
              <Text style={styles.optionType}>{options[opt][0]}:</Text>
              <Text selectable style={styles.optionValue}>
                {' '}
                {options[opt][1]}
              </Text>
            </View>
          ))}

        {url && (
          <Text style={styles.optionContainer} onPress={this.goToAdSource}>
            {t('ad.options.source')}&nbsp;
            <Icon name="ios-open-outline" style={styles.sourceIcon} />
          </Text>
        )}
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
    borderColor: activeColor,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    padding: 8,
    color: textColor,
    flexDirection: 'row',
  },
  sourceIcon: {
    fontSize: 15,
    color: textColor,
  },
  optionType: {
    color: textColor,
    fontSize: 15,
  },
  optionValue: {
    color: textColor,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
