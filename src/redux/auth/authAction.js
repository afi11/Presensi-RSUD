import {GET_DATA} from '../../services/get';
import {FORM_USER, GET_PROFIL_USER} from './authTypes';

const putProfil = payload => {
  return {
    type: GET_PROFIL_USER,
    payload: payload,
  };
};

export const putFormAuth = (inputType, inputValue) => {
  return {
    type: FORM_USER,
    inputType: inputType,
    inputValue: inputValue,
  };
};

export const getProfilData = pegawaiCode => {
  return dispatch => {
    GET_DATA(`fetch-profil?pegawaiCode=${pegawaiCode}`)
      .then(response => {
        dispatch(putProfil(response.data));
        console.log(response.data);
      })
      .catch(err => console.log(err));
  };
};
