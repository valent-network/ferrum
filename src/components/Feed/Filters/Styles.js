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
  mainContainer: { backgroundColor: primaryColor },
  mainHeader: {
    backgroundColor: primaryColor,
    flexWrap: 'nowrap',
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  resetIcon: {
    color: disabledColor,
    fontSize: 18,
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
    fontSize: 18,
    color: textColor,
  },
  filterBoxText: {
    color: textColor,
    fontSize: 18,
  },
  activeFilterBoxText: {
    color: activeTextColor,
    fontSize: 18,
  },
  activeFilterBox: {
    borderColor: activeBorderColor,
    borderWidth: 1,
    borderRadius: 32,
    padding: 8,
    backgroundColor: activeColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  filterBox: {
    borderColor: activeColor,
    borderWidth: 1,
    borderRadius: 32,
    padding: 8,
    backgroundColor: secondaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
    borderRadius: 48,
    backgroundColor: secondaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    marginRight: 8,
    marginLeft: 8,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  searchIcon: {
    color: disabledColor,
    fontSize: 18,
  },
  filtersForm: {
    paddingBottom: 96,
  },
  inputTextColor: {
    color: textColor,
  },
  searchBarInput: {
    fontSize: 18,
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
    fontSize: Platform.OS === 'android' ? 18 : 12,
    color: activeColor,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingBottom: 0,
    paddingTop: 0,
    marginRight: 0,
  },
  activeFilterIcon: {
    fontSize: Platform.OS === 'android' ? 18 : 12,
    color: activeTextColor,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingBottom: 0,
    paddingTop: 0,
    marginRight: 0,
  },
  activeTextColor: { color: activeTextColor },
  funnel: { marginRight: 0, fontSize: 12 },
});
