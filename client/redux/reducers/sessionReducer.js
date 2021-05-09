import {
  CREATE_NEW_SESSION_SAGA,
  GET_USER_SESSIONS_SAGA,
  SET_CURRENT_CREATED_SESSION,
  SET_SESSION_LOADING,
  SET_USER_SESSIONS_HISTORY,
} from '../types';

const initialState = {
  currentJoinedSession: {}, // From student's perspective (student joins)
  currentCreatedSession: {}, // From teacher's perspective (teacher creates)
  sessionHistory: [],
  errors: '',
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_SESSION_SAGA:
      return {
        ...state,
      };
    case SET_CURRENT_CREATED_SESSION:
      return {
        ...state,
        currentCreatedSession: action.payload,
      };
    case SET_SESSION_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_USER_SESSIONS_SAGA:
      return {
        ...state,
      };
    case SET_USER_SESSIONS_HISTORY:
      return {
        ...state,
        sessionHistory: action.payload,
      };
    default:
      return state;
  }
}
