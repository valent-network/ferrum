import Navigation from 'services/Navigation';

export default ({ url }) => {
  const route = url.replace(/.*?:\/\//g, '').replace(/recar\.io\//g, '');

  if (/^visited\/ads\/\d+(\/)?$/i.test(route)) {
    const adId = route.replace(/[^\d]/gi, '');
    Navigation.navigate('AdsLists');
    Navigation.push('Ad', { id: adId });
  } else if (/^ads\/\d+(\/)?$/i.test(route)) {
    const adId = route.replace(/[^\d]/gi, '');
    Navigation.navigate('AdsLists');
    Navigation.push('Ad', { id: adId });
  }

  return route;
};
