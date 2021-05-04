import { takeLatest } from 'redux-saga/effects';
import { CREATE_NEW_SESSION_SAGA } from '../types';
import { handleCreateNewSession } from './handlers/sessionHandlers';

export function* watchCreateNewSession() {
  yield takeLatest(CREATE_NEW_SESSION_SAGA, handleCreateNewSession);
}
