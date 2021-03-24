import { all } from 'redux-saga/effects';
import { watchLoginUser, watchRegisterUser } from './authSagas';

export default function* rootSaga() {
  yield all([watchRegisterUser(), watchLoginUser()]);
}
