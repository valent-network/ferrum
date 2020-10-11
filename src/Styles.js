import { StyleSheet } from 'react-native';

// const mainColor = '#8e44ad';
const mainColor = '#222';
const activeColor = '#8e44ad';

const feedStyles = {
  contactsPermissionsWarningContainer: {
    padding: 14,
    margin: 16,
    marginTop: 0,
    marginBottom: 8,
    color: '#a33',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
  },
  warningText: {
    color: '#fff',
    fontSize: 14,
  },
  warningButtonText: {
    color: mainColor,
    fontSize: 12,
  },
  warningButton: {
    marginTop: 16,
    borderColor: mainColor,
    borderRadius: 4,
    height: 32,
  },
  header: {
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundIcon: { fontSize: 256, color: '#444' },
  notFoundText: { color: '#444' },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersButton: {
    marginRight: 16,
    marginBottom: 8,
  },
  searchBarContainer: {
    backgroundColor: '#222',
    height: 30,
    borderRadius: 6,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  searchBarIcon: { fontSize: 16, color: '#666' },
  searchBarInput: { borderWidth: 0, fontSize: 14 },
};

const adStyles = {
  image: { height: 350 },
  title: {
    textAlign: 'left',
    fontSize: 18,
    marginBottom: 6,
    marginTop: 6,
    fontWeight: 'bold',
  },
  price: {
    color: '#85bb65',
    fontSize: 24,
    marginTop: 0,
    fontWeight: 'bold',
  },
  optionKey: { color: '#ffffff' },
  listItem: { borderColor: '#444' },
  priceVersion: {
    color: '#555',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 12
  },
  askButton: {
    marginBottom: 0,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    backgroundColor: mainColor,
  },
  askButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8
  },
  askIcon: { color: '#fff', fontSize: 26 },
};


const loginStyles = {
  mainContainer: {
    flex: 1,
    padding: 0,
    paddingLeft: 48,
    paddingRight: 48,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {},
  button: {
    marginTop: 12,
    backgroundColor: activeColor,
  },
  input: {
    fontSize: 18,
    color: '#ffffff',
  },
  phoneCountryText: {
    fontSize: 17,
    color: '#aaa',
    fontStyle: 'italic',
  },
  codeInput: {
    marginTop: 12,
    borderRadius: 4,
    backgroundColor: '#000',
    borderColor: activeColor
  },
  helperActions: {
    marginTop: 24,
    color: '#00a8ff',
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  errorText: { color: '#ff0000' },
};

const notificationStyles = {
  notificationWrapper: {
    marginTop: 50,
    position: 'absolute',
    left: 16,
    backgroundColor: '#eee',
    zIndex: 100000,
    width: '90%',
    paddingHorizontal: 16,
    paddingVertical: 21,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  notificationBodyText: {
    color: '#111111',
    paddingRight: 12,
    textAlign: 'justify',
  },
  close: { color: '#111111' },
};

const topNavStyles = {
  icon: { color: mainColor, paddingRight: 24 },
  burgerDrawer: { marginLeft: 16 },
  drawerItem: {
    borderBottomWidth: 4,
    borderBottomColor: '#fff',
    padding: 8,
    paddingLeft: 16,
    paddingBottom: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  }
};

const bottomNavStyles = {
  icon: { paddingTop: 5, color: '#888' },
  focusedIcon: { paddingTop: 5, color: mainColor },
  mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
};

const adCarStyles = {
  title: {
    marginBottom: 2,
    color: '#fff',
    fontSize: 24,
  },
  imagePreviewContainer: {
    flex: 1,
  },
  imagePreview: {
    height: '100%',
    borderRadius: 12,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute',
    'zIndex': 100000
  },
  option: {
    marginBottom: 12,
    color: '#aaa',
    fontSize: 14,
  },
  price: {
    color: '#85bb65',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12
  },
  mainContainer: {
    height: 500,
    marginTop: 6,
    padding: 16,
    borderRadius: 214,
  }
};

const feedFiltersModalStyles = {
  mainContainer: { justifyContent: 'flex-end', flex: 1 },
};

export default {
  // contacts: StyleSheet.create(contactsStyles),
  feed: StyleSheet.create(feedStyles),
  ad: StyleSheet.create(adStyles),
  // notifications: StyleSheet.create(notificationsStyles),
  notification: StyleSheet.create(notificationStyles),
  // settings: StyleSheet.create(settingsStyles),
  login: StyleSheet.create(loginStyles),
  topNav: StyleSheet.create(topNavStyles),
  bottomNav: StyleSheet.create(bottomNavStyles),
  adCar: StyleSheet.create(adCarStyles),
  mainColor: mainColor,
  activeColor: activeColor
  // feedFiltersModal: StyleSheet.create(feedFiltersModalStyles),
};

// export const notifications = StyleSheet.create(notificationsStyles);
// export const contacts = StyleSheet.create(contactsStyles);
export const feed = StyleSheet.create(feedStyles);
export const adCar = StyleSheet.create(adCarStyles);
// export const feedFiltersModal = StyleSheet.create(feedFiltersModalStyles);
export const ad = StyleSheet.create(adStyles);
// export const settings = StyleSheet.create(settingsStyles);
export const login = StyleSheet.create(loginStyles);
