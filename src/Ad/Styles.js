import { StyleSheet } from 'react-native';
import CSS from '../Styles';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000'
  },
  oldPricesContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop: 0,
    marginBottom: 3
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  sourceContainer: {
    margin: 12,
    marginBottom: 36,
    flexDirection: 'row'
  },
  descriptionContainer: {
    margin: 4,
    marginBottom: 16
  },
  contentContainer: {
    padding: 12
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
  },
  price: {
    color: '#85bb65',
    fontSize: 18,
    marginTop: 0,
    fontWeight: 'bold',
  },
  priceVersion: {
    color: '#555',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 12
  },
  openIcon: {
    fontSize: 18
  },
  separator: {
    borderWidth: 1,
    borderColor: '#111',
    marginTop: 8,
    marginBottom: 8
  },
  deleted: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    color: '#533'
  },
  descriptionText: {
    fontSize: 12
  },
  headerBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    color: '#fff',
    position: 'absolute',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
    marginLeft: 16
  },
  activeColor: {
    color: CSS.activeColor
  },
  mainColor: {
    color: 'white'
  },
  image: {
    height: 350
  }
});