import { Alert } from 'react-native';

import { call, put } from 'redux-saga/effects';

import {
  setSessionLoading,
  setCurrentCreatedSession,
} from '../../actions/sessionActions';

import { requestCreateNewSession } from '../requests/sessionRequests';

import * as SecureStore from 'expo-secure-store';

export function* handleCreateNewSession(action) {
  try {
    const token = yield SecureStore.getItemAsync('userToken');
    const response = yield call(requestCreateNewSession, action.payload, token);
    const { data } = response;
    yield put(setCurrentCreatedSession(data.data));
    yield put(setSessionLoading(false));
    console.log('in session create handler', data.message, data.data);
  } catch (error) {
    yield put(setSessionLoading(false));
    Alert.alert(
      'API Error',
      `Error occurred while creating a new session. Error:${error}`,
      [
        {
          text: 'Ok',
          onPress: () => {
            console.log('error creating session', error);
          },
        },
      ],
    );
  }
}
