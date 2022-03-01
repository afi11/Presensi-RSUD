import {FETCH_IZIN_DATA, FETCH_RULE_IZIN, SET_FORM_IZIN} from './izinTypes';

const initialState = {
  ruleIzins: [],
  izins: [],
  ruleIzin: {
    pegawaiCode: null,
    idRuleIzin: null,
    keteranganIzin: null,
    tanggalMulaiIzin: null,
    tanggalAkhirIzin: null,
    tipeWaktu: null,
    fileIzin: null,
    fileIzinPrevious: null,
    tipefile: null,
    waktuPresensiUser: null,
    activityCode: null,
    activityCode2: null,
  },
};

const izinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IZIN_DATA:
      return {
        ...state,
        izins: action.payload,
      };
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
