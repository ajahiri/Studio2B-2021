import axios from 'axios';
import { BASE_API_URL } from '../../../globals/globals';

// This file contains functions pertaining to API requests that have to do with auth

export function requestRegisterUser(user) {
  console.log('making request');
  return axios.request({
    method: 'post',
    url: `/api/users/register`,
    baseURL: BASE_API_URL,
    data: user,
  });
}

export function requestLoginUser(userLogin) {
  console.log('making login request:', userLogin);
  return axios.request({
    method: 'post',
    url: `/api/users/login`,
    baseURL: BASE_API_URL,
    data: userLogin,
  });
}
