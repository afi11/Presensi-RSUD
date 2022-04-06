import {POST_DATA} from '../../services';
import {GET_DATA} from '../../services/get';
import {
  FETCH_ACTIVITY_CODE_PRESENSI,
  FETCH_DATE_PRESENSI_AFTER_GOHOME,
  FETCH_ID_WAKTU_SHIFT,
  FETCH_LIST_WAKTU_SHIFT,
  FETCH_LOKASI_PRESENSI,
  FETCH_PRESENSI_MASUK,
  FETCH_PRESENSI_PULANG,
  FETCH_TIME_PRESENSI,
  FETCH_TIPE_PEGAWAI_PRESENSI,
  FETCH_TIPE_PEGAWAI_PRESENSI_SHIFT,
  FETCH_WAKTU_PRESENSI_SHIFT,
  FETCH_WAKTU_PRESENSI_USER,
  SET_ENABLE_PRESENSI,
  SET_TIME_PRESENSI_SHIFT,
} from './presensiTypes';

const putPresensiMasuk = (masuk, telat) => {
  return {
    type: FETCH_PRESENSI_MASUK,
    presensiMasuk: masuk,
    telatMasuk: telat,
  };
};

const putPresensiPulang = (pulang, jarakPulang) => {
  return {
    type: FETCH_PRESENSI_PULANG,
    presensiPulang: pulang,
    jarakPresensiPulang: jarakPulang,
  };
};

const putActivityCodePresensi = payload => {
  return {
    type: FETCH_ACTIVITY_CODE_PRESENSI,
    payload: payload,
  };
};

const putTimePresensi = presensi => {
  return {
    type: FETCH_TIME_PRESENSI,
    payload: presensi,
  };
};

export const putFormLokasiPresensi = (jarakPresensi, lat, long) => {
  return {
    type: FETCH_LOKASI_PRESENSI,
    jarakPresensi: jarakPresensi,
    latitudePresensi: lat,
    longitudePresensi: long,
  };
};

export const putFormTipePegawaiPresensi = (
  tipeWaktu,
  tipePresensi,
  pegawaiCode,
  idWaktu,
  waktuMulaiPresensi,
  waktuKerja,
  activityCode,
) => {
  return {
    type: FETCH_TIPE_PEGAWAI_PRESENSI,
    tipeWaktu: tipeWaktu,
    tipePresensi: tipePresensi,
    pegawaiCode: pegawaiCode,
    idWaktu: idWaktu,
    waktuMulaiPresensi: waktuMulaiPresensi,
    waktuKerja: waktuKerja,
    activityCode: activityCode,
  };
};

export const putFormTipePegawaiPresensiShift = (
  tipeWaktu,
  tipePresensi,
  pegawaiCode,
  activityCode,
) => {
  return {
    type: FETCH_TIPE_PEGAWAI_PRESENSI_SHIFT,
    tipeWaktu: tipeWaktu,
    tipePresensi: tipePresensi,
    pegawaiCode: pegawaiCode,
    activityCode: activityCode,
  };
};

export const putWaktuPresensiShift = (
  idWaktu,
  waktuShift,
  waktuMulaiPresensi,
  waktuKerja,
) => {
  return {
    type: FETCH_WAKTU_PRESENSI_SHIFT,
    idWaktu: idWaktu,
    waktuShift: waktuShift,
    waktuMulaiPresensi: waktuMulaiPresensi,
    waktuKerja: waktuKerja,
  };
};

export const putShiftId = idShift => {
  return {
    type: FETCH_ID_WAKTU_SHIFT,
    idWaktu: idShift,
  };
};

export const putWaktuPresensiUser = waktuUser => {
  return {
    type: FETCH_WAKTU_PRESENSI_USER,
    waktuPresensiUser: waktuUser,
  };
};

const putEnablePresensi = status => {
  return {
    type: SET_ENABLE_PRESENSI,
    payload: status,
  };
};

const putDatePresensiGoHome = tgl => {
  return {
    type: FETCH_DATE_PRESENSI_AFTER_GOHOME,
    tanggalPresensi: tgl,
  };
};

export const setTimePresensiShift = row => {
  return {
    type: SET_TIME_PRESENSI_SHIFT,
    jam_mulai_masuk: row.jam_mulai_masuk,
    jam_akhir_masuk: row.jam_akhir_masuk,
    jam_awal_pulang: row.jam_awal_pulang,
    jam_akhir_pulang: row.jam_akhir_pulang,
  };
};

export const fetchDataPresensi = (pegawaiCode, currentData, activityCode) => {
  return dispatch => {
    GET_DATA(
      `fetch-time-presensi?pegawaiCode=${pegawaiCode}&currentData=${currentData}&activityCode=${activityCode}`,
    ).then(response => {
      dispatch(putPresensiMasuk(response.presensiMasuk, response.telatMasuk));
      dispatch(
        putPresensiPulang(
          response.presensiPulang,
          parseInt(response.jarakPresensiPulang),
        ),
      );

      var tipePegawai = response.tipePegawai != 0 ? 'shift' : 'non-shift';
      var tipePresensi = response.tipePresensi;

      var waktuKerja = '';
      var waktuMulaiPresensi = '';

      if (response.tipePegawai == 0) {
        var idWaktu = response.data != null ? response.data.id : null;
        if (tipePresensi == 'jam-masuk') {
          waktuKerja = response.data.jam_akhir_masuk;
          waktuMulaiPresensi = response.data.jam_mulai_masuk;
        } else {
          waktuKerja = response.data.jam_awal_pulang;
          waktuMulaiPresensi = response.data.jam_awal_pulang;
        }

        dispatch(
          putFormTipePegawaiPresensi(
            tipePegawai,
            tipePresensi,
            pegawaiCode,
            idWaktu,
            waktuMulaiPresensi,
            waktuKerja,
            response.activityCode != null
              ? response.activityCode.activityCode
              : null,
          ),
        );
      } else {
        dispatch(
          putFormTipePegawaiPresensiShift(
            tipePegawai,
            tipePresensi,
            pegawaiCode,
            response.activityCode != null
              ? response.activityCode.activityCode
              : null,
          ),
        );
        dispatch(
          putShiftId(
            response.activityCode != null
              ? response.activityCode.idWaktuShift
              : null,
          ),
        );

        if (response.activityCode != null) {
          dispatch(
            putWaktuPresensiShift(
              response.data[0].id,
              response.data[0].shift,
              response.data[0].jam_awal_pulang,
              response.data[0].jam_akhir_pulang,
            ),
          );
        }
      }

      if (response.activityCode != null) {
        dispatch(putActivityCodePresensi(response.activityCode.activityCode));
        dispatch(putDatePresensiGoHome(response.activityCode.tanggalPresensi));
      }
      dispatch(putTimePresensi(response.data));
      dispatch(putEnablePresensi(response.isAblePresensi));
    });
  };
};
