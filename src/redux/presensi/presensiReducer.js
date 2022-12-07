import {
  FETCH_ACTIVITY_CODE_PRESENSI,
  FETCH_DATE_PRESENSI_AFTER_GOHOME,
  FETCH_ID_WAKTU_SHIFT,
  FETCH_LOKASI_PRESENSI,
  FETCH_PRESENSI_MASUK,
  FETCH_PRESENSI_PULANG,
  FETCH_TIME_PRESENSI,
  FETCH_TIPE_PEGAWAI_PRESENSI,
  FETCH_TIPE_PEGAWAI_PRESENSI_SHIFT,
  FETCH_WAKTU_PRESENSI_SHIFT,
  FETCH_WAKTU_PRESENSI_USER,
  SET_CODE_QR,
  SET_ENABLE_PRESENSI,
  SET_TIME_PRESENSI_SHIFT,
  FETCH_HARI_PRESENSI,
} from './presensiTypes';

const initialState = {
  presensiMasuk: null,
  presensiPulang: null,
  telatMasuk: null,
  jarakPresensiPulang: null,
  activityCodePresensi: null,
  isAbleToPresensi: null,
  tanggalPresensi: null,
  presensi: null,
  tglPresensi: null,
  timePresensiShift: {
    jam_mulai_masuk: null,
    jam_akhir_masuk: null,
    jam_mulai_pulang: null,
    jam_akhir_pulang: null,
  },
  storePresensi: {
    code: null,
    tipeWaktu: null,
    tipePresensi: null,
    waktuPresensiUser: null,
    pegawaiCode: null,
    idWaktu: null,
    waktuShift: null,
    waktuMulaiPresensi: null,
    waktuKerja: null,
    jarakPresensi: null,
    latitudePresensi: null,
    longitudePresensi: null,
    activityCode: null,
    jamAkhirPulang: null
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
    case FETCH_DATE_PRESENSI_AFTER_GOHOME:
      return {
        ...state,
        tanggalPresensi: action.tanggalPresensi,
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
          waktuMulaiPresensi: action.waktuMulaiPresensi,
          waktuKerja: action.waktuKerja,
          activityCode: action.activityCode,
          jamAkhirPulang: action.jamAkhirPulang
        },
      };
    case FETCH_TIPE_PEGAWAI_PRESENSI_SHIFT:
      return {
        ...state,
        storePresensi: {
          ...state.storePresensi,
          tipeWaktu: action.tipeWaktu,
          tipePresensi: action.tipePresensi,
          pegawaiCode: action.pegawaiCode,
          activityCode: action.activityCode,
        },
      };
    case FETCH_WAKTU_PRESENSI_SHIFT:
      return {
        ...state,
        storePresensi: {
          ...state.storePresensi,
          idWaktu: action.idWaktu,
          waktuShift: action.waktuShift,
          waktuMulaiPresensi: action.waktuMulaiPresensi,
          waktuKerja: action.waktuKerja,
          jamAkhirPulang: action.jamAkhirPulang
        },
      };
    case FETCH_HARI_PRESENSI:
      return {
        ...state,
        tglPresensi: action.tglPresensi
      }
    case SET_CODE_QR:
      return {
        ...state,
        storePresensi: {
          ...state.storePresensi,
          code: action.code
        }
      }
    case FETCH_ID_WAKTU_SHIFT:
      return {
        ...state,
        storePresensi: {
          ...state.storePresensi,
          idWaktu: action.idWaktu,
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
    case SET_ENABLE_PRESENSI:
      return {
        ...state,
        isAbleToPresensi: action.payload,
      };
    case SET_TIME_PRESENSI_SHIFT:
      return {
        ...state,
        timePresensiShift: {
          jam_mulai_masuk: action.jam_mulai_masuk,
          jam_akhir_masuk: action.jam_akhir_masuk,
          jam_mulai_pulang: action.jam_mulai_pulang,
          jam_akhir_pulang: action.jam_akhir_pulang,
        },
      };
    default:
      return state;
  }
};

export default presensiReducer;
