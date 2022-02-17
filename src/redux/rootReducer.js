import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import presensiReducer from './presensi/presensiReducer';
import historyPresensiReducer from './history_presensi/historyPresensiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  presensi: presensiReducer,
  historyPresensi: historyPresensiReducer,
});

export default rootReducer;
