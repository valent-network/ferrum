import { StyleSheet } from 'react-native';
import { priceColor, lightColor, primaryColor, secondaryColor, activeColor, notesColor, errorColor, deletedColor } from '../../Colors';

export default StyleSheet.create({
  textAreaContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 6,
  },
  textArea: {
    backgroundColor: secondaryColor,
    color: lightColor,
    borderColor: secondaryColor,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textAreaNotes: {
    padding: 16,
    paddingTop: 4,
    paddingLeft: 8,
    fontSize: 13
  },
  textAreaFooter: {

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
    color: lightColor,
    backgroundColor: secondaryColor,
    marginBottom: 6,
    borderBottomWidth: 0,
    padding: 4,
    paddingLeft: 8,
    borderRadius: 4,
    marginLeft: 0,
  },
  input: {
    color: lightColor,
  },
  labelText: {
  },
  labelTextError: {
    color: errorColor,
  },
  pickerText: {
    color: lightColor,
    paddingLeft: 0,
  },
  pickerPlaceholder: {
    color: activeColor,
    marginLeft: 0,
    paddingLeft: 0,
  },
  pickerContainer: {
    backgroundColor: secondaryColor,
    borderRadius: 8,
    marginBottom: 6,
  },
  pickerHeader: {
    backgroundColor: primaryColor,
    borderBottomColor: notesColor,
    color: lightColor,
  },
  pickerItemStyle: {
    borderBottomColor: notesColor,
    marginLeft: 0,
    paddingLeft: 8,
  },
  headerBackButton: { color: lightColor },
  headerTitle: { color: lightColor },
  submitButtonWrapper: { margin: 8, marginBottom: 32, padding: 0},
  submitButton: {},
  charLimitContainer: {backgroundColor: secondaryColor, padding: 8, borderBottomLeftRadius: 4, borderBottomRightRadius: 4},
  charLimitText: { color: notesColor, fontSize: 12, alignSelf: 'flex-end'},
  currency: { color: priceColor, fontSize: 14, alignSelf: 'flex-end', position: 'absolute', paddingRight: 8, paddingTop: 8},
  resetPickerIcon: {fontSize: 18, marginRight: 16},
  adImage: {
    width: 200,
    height: 120,
    marginRight: 16,
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
    marginVertical: 16,
  },
  adImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  addImageText: {
    fontWeight: 'bold',
  },
  restoreText: {
    color: lightColor,
    position: 'absolute',
    bottom: 0,
    padding: 16,
    fontWeight: 'bold',
  },
  infoIcon: {
    fontSize: 14,
  },
});