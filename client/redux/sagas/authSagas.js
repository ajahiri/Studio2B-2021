import { takeLatest, put } from 'redux-saga/effects';
import { LOGIN_USER, REGISTER_USER_SAGA } from '../types';
import { handleLoginUser, handleRegisterUser } from './handlers/authHandlers';

// Register user saga will watch for register user action and
// connect to handleRegisterUser
export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER_SAGA, handleRegisterUser);
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, handleLoginUser);
}
