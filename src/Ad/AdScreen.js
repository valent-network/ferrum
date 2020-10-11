import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl,
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
            <Text style={styles.price}>{ad.price} $</Text>

            <View style={styles.oldPricesContainer}>
              {ad.prices.map((v, index) => (
                <Text key={v[1]} style={styles.priceVersion}>{v[1]} $</Text>
              ))}
            </View>

            {ad.deleted && (
              <View>
                <View style={styles.separator}></View>
                <Text style={styles.deleted}>Удалено</Text>
              </View>
            )}

            {currentAdFriends && currentAdFriends.length > 0 &&
                (askFriendsIsLoading ?
                  <Spinner color={CSS.activeColor} /> :
                  <AskFriend ad={ad} currentAdFriends={currentAdFriends} />
                )
            }

            <OptionsList ad={ad} />

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{ad.description}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.headerBackground}>
          <Header iosBarStyle={"light-content"} style={styles.header}>
            <Left>
              <Icon name='chevron-back-outline' onPress={NavigationService.popToTop} />
            </Left>
            <Right style={styles.actionButtonsContainer}>
              <Icon onPress={this.shareAction} name='share-outline' />
              <Icon onPress={this.favAction} style={[styles.icon, colorStyle]} name={ad.is_favorite ? 'heart' : 'heart-outline'} />
            </Right>
          </Header>
        </View>
      </Container>
    );
  }
}

AdScreen.propTypes = {
  ad: PropTypes.object.isRequired,
};
