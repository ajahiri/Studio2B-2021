import { takeLatest } from 'redux-saga/effects';
import { CREATE_NEW_SESSION_SAGA, GET_USER_SESSIONS_SAGA } from '../types';
import {
  handleCreateNewSession,
  handleGetUserSessions,
} from './handlers/sessionHandlers';

export function* watchCreateNewSession() {
  yield takeLatest(CREATE_NEW_SESSION_SAGA, handleCreateNewSession);
}

export function* watchGetUserSessions() {
  yield takeLatest(GET_USER_SESSIONS_SAGA, handleGetUserSessions);
}
