import { StyleSheet, Platform } from 'react-native';
import {
  activeColor,
  trackColor,
  primaryColor,
  textColor,
  disabledColor,
  secondaryColor,
  superActiveColor,
  activeTextColor,
  activeBorderColor,
} from 'colors';

export default StyleSheet.create({
  modalContainer: {
    padding: 16,
  },
  modalControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  closeIcon: {
    color: textColor,
    fontSize: 48,
    fontWeight: 'bold',
    height: 48,
  },
  resetControl: {
    color: textColor,
    alignSelf: 'center',
    fontSize: 14,
  },
  filtersHeader: {
    borderBottomWidth: 0,
    alignSelf: 'center',
    color: textColor,
  },
  filterTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: textColor,
  },
  filterBox: {
    borderColor: activeColor,
    borderWidth: 1,
    borderRadius: 32,
    marginRight: 12,
    padding: 6,
    flexDirection: 'row',
    backgroundColor: secondaryColor,
  },
  filterBoxText: {
    color: textColor,
  },
  activeFilterBoxText: {
    color: activeTextColor,
  },
  activeFilterBox: {
    borderColor: activeBorderColor,
    borderWidth: 1,
    borderRadius: 32,
    marginRight: 12,
    padding: 6,
    flexDirection: 'row',
    backgroundColor: activeColor,
  },
  activeColor: {
    color: activeColor,
  },
  rangeItem: {
    width: '40%',
  },
  rangeItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  filterItem: {
    fontSize: 18,
    color: textColor,
  },
  activeFilterIcon: {
    color: activeTextColor,
    fontSize: 18,
  },
  activeFilterItem: {
    fontSize: 18,
    color: activeTextColor,
  },
  safeArea: {
    backgroundColor: secondaryColor,
    height: '95%',
    marginTop: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  submitButtonWrapper: {
    bottom: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  submitButton: {
    backgroundColor: activeColor,
  },
  searchBar: {
    borderRadius: 16,
    backgroundColor: secondaryColor,
    marginRight: 16,
    marginTop: Platform.OS === 'android' ? 32 : 0,
    alignSelf: Platform.OS === 'android' ? 'flex-end' : 'center',
  },
  searchIcon: {
    color: disabledColor,
    fontSize: 14,
  },
  filtersForm: {
    paddingBottom: 96,
  },
  inputTextColor: {
    color: textColor,
  },
  searchBarInput: {
    fontSize: 14,
    paddingLeft: 0,
  },
  topIconContainer: {
    height: '100%',
    minWidth: 52,
    maxWidth: 52,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
    maxHeight: 52,
  },
  filterIcon: {
    fontSize: 18,
    color: activeColor,
  },
  activeTextColor: { color: activeTextColor },
});
