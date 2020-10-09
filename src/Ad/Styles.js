import { StyleSheet } from 'react-native';

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
  headerSafeArea: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  header: {
    backgroundColor: 'transparent'
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
    marginBottom: 6,
    marginTop: 6,
    fontWeight: 'bold',
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
    backgroundColor: 'transparent',
    width: '100%',
    color: '#fff',
    height: 72,
    position: 'absolute',
    top: 0
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
    marginLeft: 16
  },
  activeColor: {
    color: 'gold'
  },
  mainColor: {
    color: 'white'
  },
  image: {
    height: 350
  }
});