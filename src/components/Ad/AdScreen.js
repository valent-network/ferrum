import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, ScrollView, Share } from 'react-native';

import {
  Text,
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
  Right,
  ActionSheet,
} from 'native-base';

import { withTranslation } from 'react-i18next';

import { loadAd } from 'actions/ads';

import ImageGallery from './ImageGallery';
import AskFriend from './AskFriend';
import OptionsList from './OptionsList';

import Navigation from 'services/Navigation';

import { styles } from './Styles';
import { activeColor, lightColor, spinnerColor } from 'colors';

import i18n from 'services/i18n';

class AdScreen extends React.PureComponent {
  shareAction = () => {
    const { ad } = this.props;

    Share.share({
      message: `${i18n.t('ad.shareText')} https://recar.io/ads/${ad.id}`,
      title: ad.title,
    });
  };

  t = this.props.t;

  favAction = () => {
    const { ad, likeAd, unlikeAd } = this.props;

    ad.favorite ? unlikeAd(ad) : likeAd(ad);
  };

  deleteAd = () => {
    const { t } = this.props;

    ActionSheet.show(
      {
        title: t('ad.alerts.confirm_delete'),
        options: [t('actions.delete'), t('actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.props.deleteAd(this.props.ad.id);
        }
      },
    );
  };

  archiveAd = () => {
    const { t } = this.props;

    ActionSheet.show(
      {
        title: t('ad.alerts.confirm_archive'),
        options: [t('actions.archive'), t('actions.cancel')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.props.archiveAd(this.props.ad.id);
        }
      },
    );
  };

  unarchiveAd = () => {
    this.props.unarchiveAd(this.props.ad.id);
  };

  editAd = () => {
    Navigation.navigate('EditAdScreen', { ad: this.props.ad });
  };

  favIconActiveStyles = [styles.icon, styles.activeColor];
  favIconDefaultStyles = [styles.icon, styles.mainColor];

  render() {
    const { t, ad, currentAdFriends, askFriendsIsLoading, isLoading, actionsLoading, onRefresh } = this.props;
    const refreshControl = <RefreshControl tintColor={lightColor} refreshing={isLoading} onRefresh={onRefresh} />;
    const colorStyle = ad.favorite ? this.favIconActiveStyles : this.favIconDefaultStyles;

    if (isLoading && typeof ad.id === 'undefined') {
      return (
        <Container>
          <Content>
            <Spinner color={spinnerColor} />
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <View style={styles.headerBackground}>
          <Header noShadow={true} iosBarStyle="light-content" style={styles.header}>
            <Left>
              <Icon
                name={Platform.OS === 'android' ? 'arrow-back-outline' : 'chevron-back-outline'}
                onPress={Navigation.popToTop}
              />
            </Left>
            <Right style={styles.actionButtonsContainer}>
              <Icon onPress={this.shareAction} name="share-outline" />
              <Icon
                onPress={this.favAction}
                style={colorStyle}
                name={ad.favorite ? 'heart-circle-outline' : 'heart-circle-sharp'}
              />
            </Right>
          </Header>
        </View>
        <ScrollView refreshControl={refreshControl} showsVerticalScrollIndicator={false}>
          <ImageGallery
            ad={ad}
            imageStyle={{ height: 350, opacity: 0.75 }}
            badgeStyle={{ right: 8, top: 312, position: 'absolute' }}
            withModal={true}
          />
          {ad.images.length === 0 && <View style={styles.imagePlaceholder}></View>}
          <View style={styles.contentContainer}>
            {ad.my_ad && actionsLoading && <Spinner color={spinnerColor} />}

            {ad.my_ad && !actionsLoading && (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={styles.actions}
              >
                {!ad.deleted && (
                  <Text style={styles.actionText} onPress={this.archiveAd}>
                    <Icon style={styles.actionIcon} name="eye-off-outline" /> {t('actions.archive')}
                  </Text>
                )}
                {ad.deleted && (
                  <Text style={styles.actionText} onPress={this.unarchiveAd}>
                    <Icon style={styles.actionIcon} name="eye-outline" /> {t('actions.unarchive')}
                  </Text>
                )}
                <Text style={styles.actionText} onPress={this.deleteAd}>
                  <Icon style={styles.actionIcon} name="trash-outline" /> {t('actions.delete')}
                </Text>
                <Text style={styles.actionText} onPress={this.editAd}>
                  <Icon style={styles.actionIcon} name="create-outline" /> {t('actions.edit')}
                </Text>
              </ScrollView>
            )}

            <Text style={styles.title}>{ad.title}</Text>
            <Text style={styles.price}>
              {ad.price} {ad.category_currency}
            </Text>

            <View style={styles.oldPricesContainer}>
              {ad.prices.map((v, index) => (
                <Text key={v[1]} style={styles.priceVersion}>
                  {v[1]} ${ad.prices.length === index + 1 ? null : ', '}
                </Text>
              ))}
            </View>

            {!ad.my_ad &&
              (askFriendsIsLoading ? (
                <Spinner color={spinnerColor} />
              ) : (
                <AskFriend ad={ad} currentAdFriends={currentAdFriends} />
              ))}

            {ad.deleted && (
              <View style={styles.deletedContainer}>
                <Text style={styles.deleted}>{t('ad.deleted')}</Text>
              </View>
            )}

            {Object.keys(ad.options).length > 0 && <OptionsList ad={ad} />}

            <View style={styles.descriptionContainer}>
              <Text selectable style={styles.descriptionText}>
                {ad.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default withTranslation()(AdScreen);

AdScreen.propTypes = {
  ad: PropTypes.object.isRequired,
};
