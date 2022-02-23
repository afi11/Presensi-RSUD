import {GET_DATA} from '../../services/get';
import {
  FETCH_HISTORY_PRESENSI_BULAN,
  FETCH_HISTORY_PRESENSI_FILTER,
  FETCH_HISTORY_PRESENSI_MINGGU,
  FETCH_KALKULASI_PRESENSI_BULAN,
  FETCH_KALKULASI_PRESENSI_FILTER,
  FETCH_KALKULASI_PRESENSI_MINGGU,
} from './historyPresensiTypes';

const putHistoryPresensiMinggu = history => {
  return {
    type: FETCH_HISTORY_PRESENSI_MINGGU,
    payload: history,
  };
};

const putHistoryPresensiBulan = history => {
  return {
    type: FETCH_HISTORY_PRESENSI_BULAN,
    payload: history,
  };
};

const putHistoryPresensiFilter = history => {
  return {
    type: FETCH_HISTORY_PRESENSI_FILTER,
    payload: history,
  };
};

const putKalkulasiMinggu = (nTelat, nTepat) => {
  return {
    type: FETCH_KALKULASI_PRESENSI_MINGGU,
    nTelatMinggu: nTelat,
    nTepatMinggu: nTepat,
  };
};

const putKalkulasiBulan = (nTelat, nTepat) => {
  return {
    type: FETCH_KALKULASI_PRESENSI_BULAN,
    nTelatBulan: nTelat,
    nTepatBulan: nTepat,
  };
};

const putKalkulasiFilter = (nTelat, nTepat) => {
  return {
    type: FETCH_KALKULASI_PRESENSI_FILTER,
    nTelatFilter: nTelat,
    nTepatFilter: nTepat,
  };
};

export const fetchHistoryPresensiMinggu = pegawaiCode => {
  return dispatch => {
    GET_DATA(`fetch-history-presensi?pegawaiCode=${pegawaiCode}&filter=minggu`)
      .then(response => {
        console.log(response.tepatWaktu);
        dispatch(putKalkulasiMinggu(response.telatWaktu, response.tepatWaktu));
        dispatch(putHistoryPresensiMinggu(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchHistoryPresensiBulan = pegawaiCode => {
  return dispatch => {
    GET_DATA(`fetch-history-presensi?pegawaiCode=${pegawaiCode}&filter=bulan`)
      .then(response => {
        dispatch(putKalkulasiBulan(response.telatWaktu, response.tepatWaktu));
        dispatch(putHistoryPresensiBulan(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchHistorySemua = (pegawaiCode, tglAwal, tglAkhir) => {
  return dispatch => {
    GET_DATA(
      `fetch-all-history-presensi?pegawaiCode=${pegawaiCode}&tglAwal=${tglAwal}&tglAkhir=${tglAkhir}`,
    )
      .then(response => {
        dispatch(putHistoryPresensiFilter(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
