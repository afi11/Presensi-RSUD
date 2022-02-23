import {
  FORM_USER,
  GET_PROFIL_USER,
  IS_SUCCESS_AUTH,
  UPDATE_PROFIL_USER,
} from './authTypes';

const initialState = {
  user: {
    username: null,
    password: null,
  },
  profil: {},
  userUpdate: {
    code: '',
    nama: '',
    nik: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
    fotoUser: '',
    tipefile: '',
  },
  messageAuth: '',
  messageError: null,
  isSuccessAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_USER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.inputType]: action.inputValue,
        },
      };
    case IS_SUCCESS_AUTH:
      return {
        ...state,
        isSuccessAuth: action.payload,
      };
    case GET_PROFIL_USER:
      return {
        ...state,
        profil: action.payload,
      };
    case UPDATE_PROFIL_USER:
      return {
        ...state,
        userUpdate: {
          ...state.userUpdate,
          [action.inputType]: action.inputValue,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
