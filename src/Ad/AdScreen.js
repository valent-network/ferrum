import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl,
  Linking,
  ScrollView,
  SafeAreaView,
  Share
} from 'react-native';

import { Text,
  Container,
  Content,
  Spinner,
  View,
  Icon,
  H3,
  Header,
  Title,
  Body,
  Left,
  Right
} from 'native-base';

import { loadAd } from '../actions/adsActions';

import ImageGallery from './ImageGallery';
import AskFriend from './AskFriend';
import OptionsList from './OptionsList';

import NavigationService from '../services/NavigationService';

import { styles } from './Styles';
import CSS from '../Styles';

export default class AdScreen extends React.PureComponent {
  goToAdSource = () => Linking.openURL(this.props.ad.url)

  shareAction = () => {
    const { ad } = this.props;

    Share.share({
      message: `Посмотри, ты можешь знать продавца: https://recar.io/ads/${ad.id}`,
      title: ad.title
    })
  }

  favAction = () => {
    const { ad, likeAdDispatched, unlikeAdDispatched } = this.props;

    ad.is_favorite ? unlikeAdDispatched(ad) : likeAdDispatched(ad)
  }

  render() {
    const { ad, currentAdFriends, askFriendsIsLoading, isLoading, onRefresh } = this.props;
    const refreshControl = <RefreshControl tintColor={CSS.activeColor} refreshing={isLoading} onRefresh={onRefresh} />;
    const colorStyle = ad.is_favorite ? styles.activeColor : styles.mainColor;

    if (isLoading && typeof ad.id === 'undefined') {
      return <Container><Content><Spinner color={CSS.activeColor}/></Content></Container>
    }

    return (
      <Container>
        <ScrollView style={styles.mainContainer} refreshControl={refreshControl} showsVerticalScrollIndicator={false}>
          <ImageGallery ad={ad} />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{ad.title}</Text>

            <View style={styles.oldPricesContainer}>

              {ad.prices.map((v, index) => (
                <Text key={v[1]} style={styles.priceVersion}>{v[1]} $</Text>
              ))}

            </View>

            <Text style={styles.price}>{ad.price} $</Text>

            {ad.deleted && (
              <View>
                <View style={styles.separator}></View>
                <Text style={styles.deleted}>Удалено</Text>
              </View>
            )}

            { currentAdFriends && currentAdFriends.length > 0 && <React.Fragment>
                <View style={styles.separator}></View>
                {askFriendsIsLoading ? <Spinner color={CSS.activeColor} /> : <AskFriend ad={ad} currentAdFriends={currentAdFriends} />}
                <View style={styles.separator}></View>
              </React.Fragment>
            }


            <OptionsList ad={ad} />

            <View style={styles.separator}></View>

            <View style={styles.descriptionContainer}>
              <H3>Описание</H3>
              <Text style={styles.descriptionText}>{ad.description}</Text>
            </View>
          </View>

          <View style={styles.separator}></View>


          <View style={styles.sourceContainer} >
            <Text onPress={this.goToAdSource}>Источник</Text>
            <Icon onPress={this.goToAdSource} name='ios-open' style={styles.openIcon}/>
          </View>
        </ScrollView>

        <View style={styles.headerBackground}>
          <SafeAreaView style={styles.headerSafeArea}>
            <Header iosBarStyle={"light-content"} style={styles.header}>
              <Left >
                <Icon name='chevron-back-outline' onPress={NavigationService.popToTop} />
              </Left>
              <Right style={styles.actionButtonsContainer}>
                <Icon onPress={this.shareAction} name='share-outline' />
                <Icon onPress={this.favAction} style={[styles.icon, colorStyle]} name='heart-outline' />
              </Right>
            </Header>
          </SafeAreaView>
        </View>
      </Container>
    );
  }
}

AdScreen.propTypes = {
  ad: PropTypes.object.isRequired,
};
