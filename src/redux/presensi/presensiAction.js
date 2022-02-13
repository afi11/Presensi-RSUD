import {GET_DATA} from '../../services/get';
import {
  FETCH_ACTIVITY_CODE_PRESENSI,
  FETCH_LOKASI_PRESENSI,
  FETCH_PRESENSI_MASUK,
  FETCH_PRESENSI_PULANG,
  FETCH_TIME_PRESENSI,
  FETCH_TIPE_PEGAWAI_PRESENSI,
  FETCH_WAKTU_PRESENSI_USER,
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
  waktuKerja,
  activityCode,
) => {
  return {
    type: FETCH_TIPE_PEGAWAI_PRESENSI,
    tipeWaktu: tipeWaktu,
    tipePresensi: tipePresensi,
    pegawaiCode: pegawaiCode,
    idWaktu: idWaktu,
    waktuKerja: waktuKerja,
    activityCode: activityCode,
  };
};

export const putWaktuPresensiUser = waktuUser => {
  return {
    type: FETCH_WAKTU_PRESENSI_USER,
    waktuPresensiUser: waktuUser,
  };
};

export const fetchDataPresensi = (pegawaiCode, currentData, activityCode) => {
  return dispatch => {
    GET_DATA(
      `fetch-time-presensi?pegawaiCode=${pegawaiCode}&currentData=${currentData}&activityCode=${activityCode}`,
    ).then(response => {
      dispatch(putTimePresensi(response.data));
      dispatch(putPresensiMasuk(response.presensiMasuk, response.telatMasuk));
      dispatch(
        putPresensiPulang(
          response.presensiPulang,
          parseInt(response.jarakPresensiPulang),
        ),
      );

      var tipePegawai = response.tipePegawai != 0 ? 'non-shift' : 'shift';
      var tipePresensi = '';
      if (response.presensiMasuk != '' && response.activityCode != null) {
        tipePresensi = 'jam-pulang';
      } else {
        tipePresensi = 'jam-masuk';
      }
      var idWaktu = response.data != null ? response.data.id : null;
      var waktuKerja =
        response.data.waktuReguler != null ? response.data.waktuReguler : null;

      dispatch(
        putFormTipePegawaiPresensi(
          tipePegawai,
          tipePresensi,
          pegawaiCode,
          idWaktu,
          waktuKerja,
          response.activityCode != null
            ? response.activityCode.activityCode
            : null,
        ),
      );
      dispatch(putActivityCodePresensi(response.activityCode.activityCode));
    });
  };
};
