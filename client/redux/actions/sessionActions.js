import {
  CREATE_NEW_SESSION_SAGA,
  GET_USER_SESSIONS_SAGA,
  SET_CURRENT_CREATED_SESSION,
  SET_SESSION_LOADING,
  SET_USER_SESSIONS_HISTORY,
} from '../types';

export const createNewSessionSaga = session => ({
  type: CREATE_NEW_SESSION_SAGA,
  payload: session,
});

export const setCurrentCreatedSession = session => ({
  type: SET_CURRENT_CREATED_SESSION,
  payload: session,
});

export const setSessionLoading = isLoading => ({
  type: SET_SESSION_LOADING,
  payload: isLoading,
});

export const getUserSessionsSaga = () => ({
  type: GET_USER_SESSIONS_SAGA,
  payload: null,
});

export const setUserSessionsHistory = sessionList => ({
  type: SET_USER_SESSIONS_HISTORY,
  payload: sessionList,
});
