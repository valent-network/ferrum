import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('@AsyncStore:accessToken');
  } catch (error) {
    return false;
  }
};

export const setAccessToken = async (accessToken) => {
  try {
    return await AsyncStorage.setItem('@AsyncStore:accessToken', accessToken);
  } catch (error) {
    return false;
  }
};

export const clearAccessToken = async () => {
  try {
    return await AsyncStorage.removeItem('@AsyncStore:accessToken');
  } catch (error) {
    return false;
  }
};

export const getWizardDone = async () => {
  try {
    return await AsyncStorage.getItem('@AsyncStorage:wizardDoneV2');
  } catch (error) {
    return false;
  }
};

export const setWizardDoneValue = async (status) => {
  try {
    return await AsyncStorage.setItem('@AsyncStorage:wizardDoneV2', status);
  } catch (error) {
    return false;
  }
};

export const getAuthPhone = async () => {
  try {
    return await AsyncStorage.getItem('@AsyncStorage:authPhone');
  } catch (error) {
    return false;
  }
};

export const setAuthPhone = async (phone) => {
  try {
    return await AsyncStorage.setItem('@AsyncStorage:authPhone', phone);
  } catch (error) {
    return false;
  }
};

export const clearAuthPhone = async () => {
  try {
    return await AsyncStorage.removeItem('@AsyncStorage:authPhone');
  } catch (error) {
    return false;
  }
};

export const getPushToken = async () => {
  try {
    return await AsyncStorage.getItem('@AsyncStorage:pushToken');
  } catch (error) {
    return false;
  }
};

export const setPushToken = async (pushToken) => {
  try {
    // return await AsyncStorage.setItem('@AsyncStorage:pushToken', JSON.stringify({ token: pushToken.token, os: pushToken.os}));
    return await AsyncStorage.setItem(
      '@AsyncStorage:pushToken',
      JSON.stringify({ push_token: pushToken.token, os: pushToken.os }),
    );
  } catch (error) {
    return false;
  }
};

export const getCachedLocale = async () => {
  try {
    return await AsyncStorage.getItem('@AsyncStorage:locale');
  } catch (error) {
    return false;
  }
};

export const setCachedLocale = async (locale) => {
  try {
    return await AsyncStorage.setItem('@AsyncStorage:locale', locale);
  } catch (error) {
    return false;
  }
};
