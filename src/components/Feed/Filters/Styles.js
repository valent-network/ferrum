import { StyleSheet, Platform } from 'react-native';
import {
  activeColor,
  trackColor,
  primaryColor,
  simpleColor,
  disabledColor,
  secondaryColor,
  superActiveColor,
} from 'colors';

export default StyleSheet.create({
  modalContainer: {
    backgroundColor: primaryColor,
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
    color: simpleColor,
    fontSize: 48,
    fontWeight: 'bold',
    height: 48,
  },
  resetControl: {
    color: simpleColor,
    alignSelf: 'center',
    fontSize: 14,
  },
  filtersHeader: {
    borderBottomWidth: 0,
    alignSelf: 'center',
  },
  filterTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 16,
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
    color: simpleColor,
  },
  activeFilterBoxText: {
    color: secondaryColor,
  },
  activeFilterBox: {
    borderColor: simpleColor,
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
    color: simpleColor,
  },
  activeFilterItem: {
    fontSize: 18,
    color: secondaryColor,
  },
  safeArea: {
    backgroundColor: primaryColor,
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
  switchFilter: {
    flexDirection: 'row',
    marginTop: 12,
  },
  searchBar: {
    borderRadius: 16,
    backgroundColor: primaryColor,
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
    color: simpleColor,
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
});
