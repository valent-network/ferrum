import { StyleSheet } from 'react-native';
import {
  activeColor,
  menuItemColor,
  appearanceBgColor,
  priceColor,
  deletedColor,
  lightColor,
  disabledColor,
} from '../Colors';

export const styles = StyleSheet.create({
  oldPricesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    marginBottom: 3,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingTop: 0,
    padding: 0,
    margin: 0,
    width: '100%',
  },
  headerBackground: {
    backgroundColor: 'transparent',
    width: '100%',
    color: lightColor,
    position: 'absolute',
    zIndex: 10,
    margin: 0,
  },
  sourceContainer: {
    margin: 12,
    marginBottom: 36,
    flexDirection: 'row',
  },
  descriptionContainer: {
    margin: 4,
    marginBottom: 16,
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
  },
  price: {
    color: priceColor,
    fontSize: 18,
    marginTop: 0,
    fontWeight: 'bold',
  },
  priceVersion: {
    color: disabledColor,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 12,
  },
  openIcon: {
    fontSize: 18,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: menuItemColor,
    marginTop: 8,
    marginBottom: 8,
  },
  deleted: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    color: deletedColor,
  },
  descriptionText: {
    fontSize: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
    marginLeft: 16,
  },
  activeColor: {
    color: activeColor,
  },
  mainColor: {
    color: lightColor,
  },
  mainContainer: {
    backgroundColor: appearanceBgColor,
  },
  image: {
    height: 350,
    opacity: 0.75,
  },
  imageGalleryBadgesContainer: {
    width: '100%',
    height: 30,
    marginTop: -30,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  imageGalleryBadge: {
    backgroundColor: lightColor,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderColor: lightColor,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  imageGalleryBadgeIcon: {
    fontSize: 15,
    color: lightColor,
    lineHeight: 20,
  },
  imageGalleryBadgeText: {
    color: lightColor,
  },
});
