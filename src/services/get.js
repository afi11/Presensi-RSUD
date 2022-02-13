import axios from 'axios';
import {apiUrl} from '../config';

export const GET_DATA = path => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/${path}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
