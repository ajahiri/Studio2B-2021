import { call, put } from 'redux-saga/effects';
import {
  logoutUser,
  authUserError,
  setAuthIsLoading,
  setUser,
  setAuthToken,
} from '../../actions/authActions';
import {
  requestLoginUser,
  requestRegisterUser,
} from '../requests/authRequests';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

// Handlers file defines the handle functions, these functions call the requests and will
// process/modify any response data needed.

export function* handleRegisterUser(action) {
  try {
    const response = yield call(requestRegisterUser, action.payload);
    // Data object is the POST response, look into data of response
    const { data: responseData } = response;
    // Weird setup on my end making the post response send a {data} meaning
    // I have to use data.data cause of axios
    // TODO: fix this as axios doesn't need a "success" boolean
    if (responseData.success) {
      yield put(setUser(responseData.data));
      yield SecureStore.setItemAsync('userToken', responseData.token);
      yield put(setAuthToken(responseData.token));
      yield put(setAuthIsLoading(false));
      yield put(authUserError(''));
    } else {
      yield put(authUserError(responseData.message));
      yield put(setAuthIsLoading(false));
    }
  } catch (error) {
    yield put(authUserError(error.response.data.message));
    yield put(setAuthIsLoading(false));
  }
}

export function* handleLoginUser(action) {
  try {
    const response = yield call(requestLoginUser, action.payload);

    const { data: responseData } = response;
    // Weird setup on my end making the post response send a {data} meaning
    // I have to use data.data cause of axios
    // TODO: fix this as axios doesn't need a "success" boolean
    if (responseData.success) {
      yield put(setUser(responseData.data));
      yield SecureStore.setItemAsync('userToken', responseData.token);
      yield put(setAuthToken(responseData.token));
      yield put(setAuthIsLoading(false));
      yield put(authUserError(''));
    } else {
      yield put(authUserError(responseData.message));
      yield put(setAuthIsLoading(false));
    }
  } catch (error) {
    yield put(authUserError(error.response.data.message));
    yield put(setAuthIsLoading(false));
  }
}

export function* handleLogoutUser(action) {
  try {
    yield SecureStore.deleteItemAsync('userToken');
    yield put(logoutUser());
  } catch (error) {
    Alert.alert('Error', 'There was an error logging out.', [{ text: 'OK' }]);
    console.log(error);
  }
}
