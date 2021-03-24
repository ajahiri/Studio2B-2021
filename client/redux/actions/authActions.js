import {
  REGISTER_USER_SAGA,
  AUTH_USER_ERROR,
  SET_USER,
  SET_AUTH_LOADING,
  SET_AUTH_TOKEN,
  LOG_OUT_USER,
  LOG_OUT_USER_SAGA,
  LOGIN_USER_SAGA,
} from '../types';

export const registerUser = user => ({
  type: REGISTER_USER_SAGA,
  payload: user,
});

// Get error from dispatch, error object is form of axios response
export const authUserError = error => ({
  type: AUTH_USER_ERROR,
  payload: error,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const setAuthToken = token => ({ type: SET_AUTH_TOKEN, payload: token });

export const logoutUserSaga = () => ({
  type: LOG_OUT_USER_SAGA,
  payload: null,
});

// Need to clear SecureStore out as well as auth reducer
export const logoutUser = () => ({ type: LOG_OUT_USER, payload: null });

export const loginUser = user => ({ type: LOGIN_USER_SAGA, payload: user });

export const setAuthIsLoading = isLoading => ({
  type: SET_AUTH_LOADING,
  payload: isLoading,
});

// export const loginUser = authData => {
//   const { email, password } = authData;
//   return async dispatch => {
//     // logic to make a post request to LOGIN the user
//     const result = await fetch(`${BASE_API_URL}/api/users/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     const resultData = await result.json();

//     if (resultData.success) {
//       dispatch({
//         type: LOGIN_USER_SUCCESS,
//         payload: resultData,
//       });
//     } else {
//       dispatch({
//         type: LOGIN_USER_FAIL,
//       });
//     }

//     return resultData;
//   };
// };
