import {
  FETCH_ACTIVITY_CODE_PRESENSI,
  FETCH_FORM_PEGAWAI_CODE,
  FETCH_LOKASI_PRESENSI,
  FETCH_PRESENSI_MASUK,
  FETCH_PRESENSI_PULANG,
  FETCH_TIME_PRESENSI,
  FETCH_TIPE_PEGAWAI_PRESENSI,
  FETCH_WAKTU_PRESENSI_USER,
} from './presensiTypes';

const initialState = {
  presensiMasuk: null,
  presensiPulang: null,
  telatMasuk: null,
  jarakPresensiPulang: null,
  activityCodePresensi: null,
  presensi: {
    nama_shift: null,
    jam_masuk: null,
    jam_pulang: null,
    pegawai_code: null,
    tanggal: null,
  },
  storePresensi: {
    tipeWaktu: null,
    tipePresensi: null,
    waktuPresensiUser: null,
    pegawaiCode: null,
    idWaktu: null,
    waktuKerja: null,
    jarakPresensi: null,
    latitudePresensi: null,
    longitudePresensi: null,
    activityCode: null,
  },
};

const presensiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TIME_PRESENSI:
      return {
        ...state,
        presensi: action.payload,
      };
    case FETCH_PRESENSI_MASUK:
      return {
        ...state,
        presensiMasuk: action.presensiMasuk,
        telatMasuk: action.telatMasuk,
      };
    case FETCH_PRESENSI_PULANG:
      return {
        ...state,
        presensiPulang: action.presensiPulang,
        jarakPresensiPulang: action.jarakPresensiPulang,
      };
    case FETCH_ACTIVITY_CODE_PRESENSI:
      return {
        ...state,
        activityCodePresensi: action.payload,
      };
    case FETCH_LOKASI_PRESENSI:
      return {
        ...state,
        storePresensi: {
          ...state.storePresensi,
          jarakPresensi: action.jarakPresensi,
          latitudePresensi: action.latitudePresensi,
          longitudePresensi: action.longitudePresensi,
        },
      };
    case FETCH_TIPE_PEGAWAI_PRESENSI:
      return {
        ...state,
        storePresensi: {
          ...state.storePresensi,
          tipeWaktu: action.tipeWaktu,
          tipePresensi: action.tipePresensi,
          pegawaiCode: action.pegawaiCode,
          idWaktu: action.idWaktu,
          waktuKerja: action.waktuKerja,
          activityCode: action.activityCode,
        },
      };
    case FETCH_WAKTU_PRESENSI_USER:
      return {
        ...state,
        storePresensi: {
          ...state.storePresensi,
          waktuPresensiUser: action.waktuPresensiUser,
        },
      };
    default:
      return state;
  }
};

export default presensiReducer;
