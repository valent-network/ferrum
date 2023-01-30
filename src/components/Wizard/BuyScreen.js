import React from 'react';

import PropTypes from 'prop-types';
import { SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';
import { withTranslation } from 'react-i18next';

import PICTURE from 'assets/wizard-buy.png';

import styles from './styles';

class BuyScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('SellScreen');
  };

  render() {
    const { t } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Content>
            <Image style={styles.picture} source={PICTURE} />
            <H1 style={styles.h1}>{t('wizzard.buyH1')}</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>{t('wizzard.buyPros1')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.buyPros2')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.buyPros3')}</Text>
            </View>
          </Content>
          <Button block dark onPress={this.nextStep} style={styles.goButton}>
            <Text style={styles.goButtonText}>{t('wizzard.buySubmit')}</Text>
          </Button>
        </Container>
      </SafeAreaView>
    );
  }
}

export default withTranslation()(BuyScreen);

BuyScreen.propTypes = {};
