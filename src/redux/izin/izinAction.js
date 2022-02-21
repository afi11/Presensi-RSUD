import { POST_DATA } from '../../services';
import {GET_DATA} from '../../services/get';
import {FETCH_RULE_IZIN, SET_FORM_IZIN} from './izinTypes';

const putRuleIzin = payload => {
  return {
    type: FETCH_RULE_IZIN,
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

export const fetchRuleIzin = () => {
  return dispatch => {
    GET_DATA('fetch-rule-izin')
      .then(response => {
        dispatch(putRuleIzin(response.data));
      })
      .catch(err => console.log(err));
  };
};