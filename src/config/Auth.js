import {AsyncStorage} from 'react-native';

const token = 'token';
const userId = 'userId';

export const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(token)
      .then(res => {
        if (res != null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(userId)
      .then(res => {
        if (res != null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};
