import {FORM_USER} from './authTypes';

export const putFormAuth = (inputType, inputValue) => {
  return {
    type: FORM_USER,
    inputType: inputType,
    inputValue: inputValue,
  };
};
