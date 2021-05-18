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
  SEARCH_USERS_SAGA,
  SET_SEARCHED_USERS,
  SET_REG_INDEX,
} from '../types';

const initialState = {
  user: {},
  searchedUsers: [],
  errors: '',
  isLoading: false,
  authToken: null,
  reg_index: 0,
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
      return { 
        ...state 
      };
    case SEARCH_USERS_SAGA:
      return {
        ...state,
      };
    case SET_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: action.payload,
      }
    case SET_REG_INDEX:
      return {
        ...state,
        reg_index: action.payload,
      };
    default:
      return state;
  }
}
