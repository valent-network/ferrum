import { StyleSheet } from 'react-native';
import {
  priceColor,
  simpleColor,
  primaryColor,
  secondaryColor,
  activeColor,
  notesColor,
  errorColor,
  deletedColor,
  disabledColor,
} from 'colors';

export default StyleSheet.create({
  textAreaContainer: {
    marginTop: 16,
    padding: 4,
    paddingLeft: 0,
    borderRadius: 4,
    marginLeft: 0,
    backgroundColor: secondaryColor,
  },
  textArea: {
    backgroundColor: secondaryColor,
    color: simpleColor,
    borderColor: secondaryColor,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textAreaFooter: {},
  textAreaLabel: {
    paddingLeft: 8,
  },
  textAreaFooterError: {
    borderBottomWidth: 1,
    borderBottomColor: errorColor,
  },
  inputRefPickerWorkaround: {
    maxWidth: 1,
    height: '100%',
  },
  inputRefTextareaWorkaround: {
    maxWidth: 1,
    height: 1,
  },
  inputContainer: {
    color: simpleColor,
    backgroundColor: secondaryColor,
    borderBottomWidth: 0,
    marginTop: 16,
    padding: 4,
    paddingLeft: 8,
    borderRadius: 4,
    marginLeft: 0,
  },
  input: {
    color: simpleColor,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: simpleColor,
  },
  labelTextError: {
    color: errorColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerText: {
    color: simpleColor,
    paddingLeft: 0,
  },
  pickerPlaceholder: {
    color: activeColor,
    marginLeft: 0,
    paddingLeft: 0,
  },
  pickerContainer: {
    backgroundColor: secondaryColor,
    borderRadius: 4,
    marginTop: 16,
  },
  pickerHeader: {
    backgroundColor: primaryColor,
    borderBottomColor: disabledColor,
    color: simpleColor,
  },
  pickerItemStyle: {
    borderBottomColor: notesColor,
    marginLeft: 0,
    paddingLeft: 8,
  },
  headerBackButton: { color: simpleColor },
  headerTitle: { color: simpleColor },
  submitButtonWrapper: { margin: 8, marginBottom: 32, padding: 0 },
  submitButton: {},
  charLimitContainer: {
    backgroundColor: secondaryColor,
    padding: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  charLimitText: { color: disabledColor, fontSize: 12, alignSelf: 'flex-end' },
  currency: {
    color: priceColor,
    fontSize: 18,
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingRight: 8,
    paddingTop: 8,
    fontWeight: 'bold',
  },
  resetPickerIcon: {
    fontSize: 24,
    paddingRight: 8,
  },
  pickerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Platform.OS == 'android' ? 0 : 16,
  },
  adImage: {
    width: 200,
    height: 120,
    marginRight: 0,
    borderRadius: 4,
    backgroundColor: notesColor,
  },
  adImageDeleted: {
    opacity: 0.3,
  },
  deleteIcon: {
    position: 'absolute',
    right: 0,
    top: -16,
    color: deletedColor,
  },
  adImagesContainer: {
    margin: 16,
    marginLeft: 0,
  },
  adImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  addImageText: {
    fontWeight: '900',
    fontSize: 18,
    color: simpleColor,
  },
  addImageTextError: {
    color: deletedColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  restoreText: {
    color: simpleColor,
    position: 'absolute',
    top: 0,
    padding: 16,
    fontWeight: 'bold',
  },
  infoIcon: {
    fontSize: 14,
  },
  errorMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessageText: {
    color: deletedColor,
  },
  makeMainButton: {
    backgroundColor: activeColor,
    marginTop: 16,
    alignSelf: 'center',
  },
  makeMainButtonText: { alignSelf: 'center', backgroundColor: notesColor, marginTop: 16, padding: 4 },
});
