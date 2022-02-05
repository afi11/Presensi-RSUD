import axios from 'axios';
import {apiUrl} from '../config';

export const POST_DATA = (params, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl + params, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
