import {
  REGISTER_USER_SAGA,
  SET_USER,
  AUTH_USER_ERROR,
  SET_AUTH_LOADING,
  SET_AUTH_TOKEN,
  LOG_OUT_USER,
  LOG_OUT_USER_SAGA,
  LOGIN_USER_SAGA,
  GET_THIS_USER_SAGA,
} from '../types';

const initialState = {
  user: {},
  errors: '',
  isLoading: false,
  authToken: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_SAGA:
      return {
        ...state,
      };
    case AUTH_USER_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case LOG_OUT_USER_SAGA:
      return {
        ...state,
      };
    case LOG_OUT_USER:
      return {
        ...initialState,
      };
    case LOGIN_USER_SAGA:
      return {
        ...state,
      };
    case GET_THIS_USER_SAGA:
      return { ...state };
    default:
      return state;
  }
}
