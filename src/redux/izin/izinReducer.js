import {FETCH_RULE_IZIN, SET_FORM_IZIN} from './izinTypes';

const initialState = {
  ruleIzins: [],
  ruleIzin: {
    pegawaiCode: null,
    idRuleIzin: null,
    keteranganIzin: null,
    tanggalMulaiIzin: null,
    tanggalAkhirIzin: null,
    fileIzin: null,
    tipefile: null,
  },
};

const izinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RULE_IZIN:
      return {
        ...state,
        ruleIzins: action.payload,
      };
    case SET_FORM_IZIN:
      return {
        ...state,
        ruleIzin: {
          ...state.ruleIzin,
          [action.inputType]: action.inputValue,
        },
      };
    default:
      return state;
  }
};

export default izinReducer;
