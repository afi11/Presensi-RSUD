import axios from 'axios';
import {apiUrl} from '../config';

export const UPDATE_DATA = (params, id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(apiUrl + '/' + params + '/' + id, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};
