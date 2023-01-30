import React from 'react';

import PropTypes from 'prop-types';
import { SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';
import { withTranslation } from 'react-i18next';

import PICTURE from 'assets/wizard-sell.png';

import styles from './styles';

class SellScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('ConnectScreen');
  };

  render() {
    const { t } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Content>
            <Image style={styles.picture} source={PICTURE} />
            <H1 style={styles.h1}>{t('wizzard.sellH1')}</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>{t('wizzard.sellPros1')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.sellPros2')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.sellPros3')}</Text>
            </View>
          </Content>
          <Button block dark onPress={this.nextStep} style={styles.goButton}>
            <Text style={styles.goButtonText}>{t('wizzard.sellSubmit')}</Text>
          </Button>
        </Container>
      </SafeAreaView>
    );
  }
}

export default withTranslation()(SellScreen);

SellScreen.propTypes = {};
