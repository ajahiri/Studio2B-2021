import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  SET_USER,
  SET_AUTH_LOADING,
  SET_AUTH_TOKEN,
} from '../types';

const initialState = {
  user: {},
  errors: '',
  isLoading: false,
  authToken: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
      };
    case REGISTER_USER_ERROR:
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
    default:
      return state;
  }
}
