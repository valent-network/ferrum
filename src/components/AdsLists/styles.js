import { StyleSheet } from 'react-native';
import { primaryColor, secondaryColor, activeColor, lightColor, superActiveColor } from 'colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: primaryColor,
  },
  header: { backgroundColor: secondaryColor, flexDirection: 'column' },
  title: { color: lightColor, fontWeight: 'bold' },
  segmentButton: { borderColor: activeColor, width: '33.33333%', justifyContent: 'center' },
  tabButton: {
    width: '33.3333%',
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderRadius: 0,
  },
  activeTabButton: {
    width: '33.3333%',
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: superActiveColor,
    borderRadius: 0,
  },
});
