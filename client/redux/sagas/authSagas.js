import { takeLatest } from 'redux-saga/effects';
import {
  LOGIN_USER_SAGA,
  LOG_OUT_USER_SAGA,
  REGISTER_USER_SAGA,
  GET_THIS_USER_SAGA,
  SEARCH_USERS_SAGA
} from '../types';
import {
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
  handleGetThisUser,
  handleSearchUsers,
} from './handlers/authHandlers';

// Register user saga will watch for register user action and
// connect to handleRegisterUser
export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER_SAGA, handleRegisterUser);
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER_SAGA, handleLoginUser);
}

export function* watchLogoutUser() {
  yield takeLatest(LOG_OUT_USER_SAGA, handleLogoutUser);
}

export function* watchGetThisUser() {
  yield takeLatest(GET_THIS_USER_SAGA, handleGetThisUser);
}

export function* watchSearchUsers() {
  yield takeLatest(SEARCH_USERS_SAGA, handleSearchUsers);
}
