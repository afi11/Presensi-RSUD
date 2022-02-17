import {
  FETCH_HISTORY_PRESENSI_BULAN,
  FETCH_HISTORY_PRESENSI_FILTER,
  FETCH_HISTORY_PRESENSI_MINGGU,
  FETCH_KALKULASI_PRESENSI_BULAN,
  FETCH_KALKULASI_PRESENSI_FILTER,
  FETCH_KALKULASI_PRESENSI_MINGGU,
} from './historyPresensiTypes';

const initialState = {
  nTepatMinggu: 0,
  nTelatMinggu: 0,
  nTepatBulan: 0,
  nTelatBulan: 0,
  nTepatFilter: 0,
  nTelatFilter: 0,
  historyPresensiMinggu: [],
  historyPresensiBulan: [],
  historyPresensiFilter: [],
};

const historyPresensiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HISTORY_PRESENSI_MINGGU:
      return {
        ...state,
        historyPresensiMinggu: action.payload,
      };
    case FETCH_HISTORY_PRESENSI_BULAN:
      return {
        ...state,
        historyPresensiBulan: action.payload,
      };
    case FETCH_HISTORY_PRESENSI_FILTER:
      return {
        ...state,
        historyPresensiFilter: action.payload,
      };
    case FETCH_KALKULASI_PRESENSI_MINGGU:
      return {
        ...state,
        nTelatMinggu: action.nTelatMinggu,
        nTepatMinggu: action.nTepatMinggu,
      };
    case FETCH_KALKULASI_PRESENSI_BULAN:
      return {
        ...state,
        nTelatBulan: action.nTelatBulan,
        nTepatBulan: action.nTepatBulan,
      };
    case FETCH_KALKULASI_PRESENSI_FILTER:
      return {
        ...state,
        nTepatFilter: action.nTelatFilter,
        nTelatFilter: action.nTelatFilter,
      };
    default:
      return state;
  }
};

export default historyPresensiReducer;
