import React, { useState } from 'react';
import { Text, Content, List, ListItem, Radio, Left, Right, Container, View } from 'native-base';
import { StyleSheet } from 'react-native';

import { primaryColor, textColor, secondaryColor } from 'colors';
import { getCachedLocale, setCachedLocale } from 'services/AsyncStorage';
import i18n from 'services/i18n';
import API from 'services/API';

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
    <Container style={{ backgroundColor: primaryColor }}>
      <Content>
        <List>
          <ListItem selected={locale === 'uk'} onPress={() => changeLocale('uk')}>
            <Left>
              <Text style={{ color: textColor }}>🇺🇦 Українська</Text>
            </Left>
            <Right>
              <Radio selected={locale === 'uk'} onPress={() => changeLocale('uk')} />
            </Right>
          </ListItem>
          <ListItem selected={locale === 'en'} onPress={() => changeLocale('en')}>
            <Left>
              <Text style={{ color: textColor }}>🇬🇧 English</Text>
            </Left>
            <Right>
              <Radio selected={locale === 'en'} onPress={() => changeLocale('en')} />
            </Right>
          </ListItem>
        </List>

        <View style={styles.notes}>
          <Text style={{ color: textColor }}>
            Для того, щоб весь контент було коректно перекладено відповідно до ваших налаштувань, може знадобитись
            перезавантаження додатку. Вибачте за незручності
          </Text>
        </View>

        <View style={styles.notes}>
          <Text style={{ color: textColor }}>
            In order to correctly translate everything, application reload may be required. We are sorry for this
            inconvenience
          </Text>
        </View>
      </Content>
    </Container>
  );
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
    headerTitleStyle: { color: textColor },
    headerBackTitle: () => null,
    headerTruncatedBackTitle: () => null,
    headerBackTitleVisible: false,
    headerTintColor: textColor,
  };
};

export default LanguageScreen;

const styles = StyleSheet.create({
  notes: { padding: 16 },
});
