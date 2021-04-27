import {
  CREATE_NEW_SESSION_SAGA,
  SET_CURRENT_CREATED_SESSION,
  SET_SESSION_LOADING,
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
