import { StyleSheet } from 'react-native';
import { AD_IMAGE_HEIGHT } from 'utils';
import {
  activeColor,
  secondaryColor,
  primaryColor,
  priceColor,
  deletedColor,
  textColor,
  disabledColor,
  superActiveColor,
  activeTextColor,
} from 'colors';

export default styles = StyleSheet.create({
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
    width: '100%',
    position: 'absolute',
    zIndex: 10,
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
    color: textColor,
  },
  statText: {
    color: textColor,
    fontSize: 16,
    paddingHorizontal: 4,
  },
  statBlock: {
    flexDirection: 'row',
    marginRight: 16,
  },
  stats: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: secondaryColor,
    borderRadius: 4,
    minWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 13,
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
    color: textColor,
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
  activeColor: {
    color: activeColor,
  },
  activeTextColor: {
    color: activeTextColor,
  },
  mainContainer: {
    backgroundColor: primaryColor,
  },
  image: {
    height: AD_IMAGE_HEIGHT,
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
    backgroundColor: primaryColor,
  },
  imageGalleryBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: textColor,
    opacity: 0.5,
    paddingBottom: 0,
    paddingTop: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  imageGalleryBadgeText: {
    color: secondaryColor,
    fontSize: 14,
  },
  imagePlaceholder: {
    height: AD_IMAGE_HEIGHT,
    width: '100%',
    backgroundColor: disabledColor,
  },
  imageModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    alignItems: 'center',
    position: 'absolute',
    top: 48,
    width: '100%',
    zIndex: 1000,
  },
  spanIcon: {
    opacity: 0,
  },
  imageModalIndex: { color: textColor },
  imageModalIndexCloseIcon: { color: textColor },
  imageModalCloseIcon: { color: textColor },
  badgeStyleForAdScreen: { right: 8, top: 312, position: 'absolute' },
  imageProcessingPlaceholder: {
    height: AD_IMAGE_HEIGHT,
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  imageProcessingText: { color: textColor, textAlign: 'center' },
});
