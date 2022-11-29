import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import { Container, Content, Text, Button, H1, View } from 'native-base';
import { withTranslation } from 'react-i18next';

import { activeColor, disabledColor, primaryColor } from '../Colors';

import PICTURE from '../assets/wizard1.png';

class HelloScreen extends React.PureComponent {
  nextStep = () => {
    this.props.navigation.navigate('ContactsRequestScreen');
  };

  render() {
    const { t } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container>
          <Content>
            <Image style={styles.picture} source={PICTURE} />
            <H1 style={styles.h1}>{t('wizzard.helloH1')}</H1>
            <View style={styles.mainContainer}>
              <Text style={styles.textBlock}>{t('wizzard.helloPros1')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.helloPros2')}</Text>
              <Text style={styles.textBlock}>{t('wizzard.helloPros3')}</Text>
            </View>
          </Content>
          <Button block dark onPress={this.nextStep} style={styles.goButton}>
            <Text style={styles.goButtonText}>{t('wizzard.helloSubmit')}</Text>
          </Button>
        </Container>
      </SafeAreaView>
    );
  }
}

export default withTranslation()(HelloScreen);

HelloScreen.propTypes = {};

const styles = StyleSheet.create({
  h1: {
    textAlign: 'left',
    paddingHorizontal: 16,
    fontWeight: 'bold',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  textBlock: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 24,
    color: disabledColor,
  },
  goButton: {
    backgroundColor: activeColor,
    marginHorizontal: 24,
    marginVertical: 16,
    padding: 24,
    height: 64,
    borderRadius: 32,
  },
  goButtonText: {
    fontWeight: 'bold',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  icon: {
    alignSelf: 'center',
    color: activeColor,
    fontSize: 48,
  },
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '25%',
    marginBottom: '10%',
    width: 200,
    height: 200,
  },
});
