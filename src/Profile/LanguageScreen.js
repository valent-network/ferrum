import React, { useState } from 'react';
import { Text, Content, List, ListItem, Radio, Left, Right, Container, View } from 'native-base';
import { StyleSheet } from 'react-native';

import { primaryColor, lightColor, secondaryColor } from '../Colors';
import { getCachedLocale, setCachedLocale } from '../AsyncStorage';
import i18n from '../../i18n';
import API from '../services/API';

function LanguageScreen({ navigation }) {
   const [locale, setLocale] = useState();

  getCachedLocale().then((l) => {
    setLocale(l || locale);
  });

  function changeLocale(locale) {
   i18n.changeLanguage(locale);
   setLocale(locale);
   setCachedLocale(locale);
   API.changeLanguage(locale);
   navigation.goBack();
  }

  return (
    <Container>
      <Content>
        <List>
          <ListItem selected={locale === 'uk'} onPress={() => changeLocale('uk')}>
            <Left><Text>🇺🇦 Українська</Text></Left>
            <Right><Radio selected={locale === 'uk'} onPress={() => changeLocale('uk')}/></Right>
          </ListItem>
          <ListItem selected={locale === 'en'} onPress={() => changeLocale('en')}>
            <Left><Text>🇬🇧 English</Text></Left>
            <Right><Radio selected={locale === 'en'} onPress={() => changeLocale('en')}/></Right>
          </ListItem>
        </List>

        <View style={styles.notes}>
          <Text>Для того, щоб весь контент було коректно перекладено відповідно до ваших налаштувань, може знадобитись перезавантаження додатку. Вибачте за незручності</Text>
        </View>

        <View style={styles.notes}>
          <Text>In order to correctly translate everything, application reload may be required. We are sorry for this inconvenience</Text>
        </View>
      </Content>
    </Container>
  )
}

LanguageScreen.navigationOptions = ({ navigation }) => {

  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      borderWidth: 0,
      borderBottomColor: primaryColor,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTitle: i18n.t('nav.titles.language'),
    headerTitleStyle: { color: lightColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: lightColor,
  };
};

export default LanguageScreen;

const styles = StyleSheet.create({
  notes: { padding: 16 }
});
