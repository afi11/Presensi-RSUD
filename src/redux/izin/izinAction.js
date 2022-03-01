import {POST_DATA} from '../../services';
import {GET_DATA} from '../../services/get';
import {FETCH_IZIN_DATA, FETCH_RULE_IZIN, SET_FORM_IZIN} from './izinTypes';

const putRuleIzin = payload => {
  return {
    type: FETCH_RULE_IZIN,
    payload: payload,
  };
};

const putIzinData = payload => {
  return {
    type: FETCH_IZIN_DATA,
    payload: payload,
  };
};

export const changeFormIzin = (inputType, inputValue) => {
  return {
    type: SET_FORM_IZIN,
    inputType: inputType,
    inputValue: inputValue,
  };
};

export const fetchRuleIzin = pegawaiCode => {
  return dispatch => {
    GET_DATA(`fetch-rule-izin?pegawaiCode=${pegawaiCode}`)
      .then(response => {
        dispatch(putRuleIzin(response.data));
        dispatch(changeFormIzin('activityCode', response.activityCode));
      })
      .catch(err => console.log(err));
  };
};

export const fetchRuleIzin2 = pegawaiCode => {
  return dispatch => {
    GET_DATA(`fetch-rule-izin-edit-cuti?pegawaiCode=${pegawaiCode}`)
      .then(response => {
        dispatch(putRuleIzin(response.data));
        dispatch(changeFormIzin('activityCode', response.activityCode));
      })
      .catch(err => console.log(err));
  };
};

export const fetchIzinData = pegawaiCode => {
  return dispatch => {
    GET_DATA(`fetch-histori-izin?pegawaiCode=${pegawaiCode}`)
      .then(response => {
        dispatch(putIzinData(response.data));
      })
      .catch(err => console.log(err));
  };
};
