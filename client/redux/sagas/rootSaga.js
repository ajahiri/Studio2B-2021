import { all } from 'redux-saga/effects';
import {
  watchLoginUser,
  watchLogoutUser,
  watchRegisterUser,
} from './authSagas';

export default function* rootSaga() {
  yield all([watchRegisterUser(), watchLoginUser(), watchLogoutUser()]);
}
