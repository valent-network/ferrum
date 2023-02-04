import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';
import { withTranslation } from 'react-i18next';

import PICTURE from 'assets/wizard-connect.png';

import styles from './styles';

import { primaryColor } from 'colors';

class ConnectScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('ContactsRequestScreen');
  };

  render() {
    const { t } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container style={{ backgroundColor: primaryColor }}>
          <Content>
            <Image style={styles.picture} source={PICTURE} />
            <H1 style={styles.h1}>{t('wizzard.connectH1')}</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>{t('wizzard.connectPros1')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.connectPros2')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.connectPros3')}</Text>
            </View>
          </Content>
          <Button block dark onPress={this.nextStep} style={styles.goButton}>
            <Text style={styles.goButtonText}>{t('wizzard.connectSubmit')}</Text>
          </Button>
        </Container>
      </SafeAreaView>
    );
  }
}

export default withTranslation()(ConnectScreen);

ConnectScreen.propTypes = {};
