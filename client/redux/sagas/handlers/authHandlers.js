import { call, put } from 'redux-saga/effects';
import {
  registerUserError,
  setAuthIsLoading,
  setUser,
} from '../../actions/authActions';
import { requestRegisterUser } from '../requests/authRequests';
import * as SecureStore from 'expo-secure-store';

// Handlers file defines the handle functions, these functions call the requests and will
// process/modify any response data needed.

export function* handleRegisterUser(action) {
  try {
    const response = yield call(requestRegisterUser, action.payload);
    // Data object is the POST response, look into data of response
    const { data: responseData } = response;
    console.log(response);
    // Weird setup on my end making the post response send a {data} meaning
    // I have to use data.data cause of axios
    // TODO: fix this as axios doesn't need a "success" boolean
    if (responseData.success) {
      yield put(setUser(responseData.data));
      yield SecureStore.setItemAsync('userToken', responseData.token);
      yield put(setAuthIsLoading(false));
    } else {
      yield put(registerUserError(responseData.message));
      yield put(setAuthIsLoading(false));
    }
  } catch (error) {
    yield put(registerUserError(error.response.data.message));
    yield put(setAuthIsLoading(false));
  }
}

export function* handleLoginUser(action) {
  try {
  } catch (error) {}
}
