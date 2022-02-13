import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import presensiReducer from './presensi/presensiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  presensi: presensiReducer,
});

export default rootReducer;
