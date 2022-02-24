import {AsyncStorage} from 'react-native';

const user = 'user';

export const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(user)
      .then(res => {
        if (res != null) {
          resolve(JSON.parse(res).token);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(user)
      .then(res => {
        if (res != null) {
          resolve(JSON.parse(res).userId);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};
