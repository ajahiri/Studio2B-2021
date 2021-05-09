import { all } from 'redux-saga/effects';
import {
  watchLoginUser,
  watchLogoutUser,
  watchRegisterUser,
  watchGetThisUser,
} from './authSagas';

import { watchCreateNewSession, watchGetUserSessions } from './sessionSagas';

export default function* rootSaga() {
  yield all([
    watchRegisterUser(),
    watchLoginUser(),
    watchLogoutUser(),
    watchGetThisUser(),
    watchCreateNewSession(),
    watchGetUserSessions(),
  ]);
}
