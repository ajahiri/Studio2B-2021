import axios from 'axios';
import { resolveBaseURL } from '../../../globals/globals';

const BASE_API_URL = resolveBaseURL();

export function requestCreateNewSession(session, authToken) {
  return axios.request({
    method: 'post',
    url: `/api/sessions/createSession`,
    baseURL: BASE_API_URL,
    data: session,
    headers: {
      'auth-token': authToken,
    },
  });
}

export function requestGetUserSessions(authToken) {
  return axios.request({
    method: 'post',
    url: `/api/sessions/getUserSessions`,
    baseURL: BASE_API_URL,
    headers: {
      'auth-token': authToken,
    },
  });
}
