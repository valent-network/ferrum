import { StyleSheet } from 'react-native';
import {
  activeColor,
  secondaryColor,
  primaryColor,
  priceColor,
  deletedColor,
  simpleColor,
  disabledColor,
  superActiveColor,
} from 'colors';

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
    color: simpleColor,
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
    marginBottom: 16,
    marginTop: 4,
    backgroundColor: secondaryColor,
    padding: 16,
    borderRadius: 4,
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
    color: simpleColor,
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
    borderWidth: 5,
    borderColor: secondaryColor,
    marginTop: 8,
    marginBottom: 8,
  },
  deleted: {
    textAlign: 'center',
    paddingVertical: 16,
    color: deletedColor,
  },
  deletedContainer: {
    backgroundColor: secondaryColor,
    borderRadius: 4,
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 15 * 1.5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  actions: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: secondaryColor,
    borderRadius: 4,
    minWidth: '100%',
    justifyContent: 'center',
  },
  actionText: {
    color: activeColor,
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 15,
    color: activeColor,
  },
  icon: {
    marginRight: 8,
    marginLeft: 16,
  },
  activeColor: {
    color: activeColor,
  },
  mainColor: {
    color: secondaryColor,
  },
  mainContainer: {
    backgroundColor: primaryColor,
  },
  image: {
    height: 350,
    opacity: 0.75,
  },
  imageGalleryBadgesContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    opacity: 1,
  },
  imageGalleryModalContainer: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: primaryColor,
  },
  imageGalleryBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderColor: secondaryColor,
    borderWidth: 1,
    backgroundColor: disabledColor,
    opacity: 0.75,
    paddingBottom: 0,
  },
  imageGalleryBadgeIcon: {
    fontSize: 15,
    color: secondaryColor,
    alignSelf: 'center',
  },
  imageGalleryBadgeText: {
    color: secondaryColor,
    fontSize: 15,
  },
  imagePlaceholder: {
    height: 350,
    width: '100%',
    backgroundColor: disabledColor,
  },
});
