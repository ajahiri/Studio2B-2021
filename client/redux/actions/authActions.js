import {
  REGISTER_USER_SAGA,
  REGISTER_USER_ERROR,
  SET_USER,
  SET_AUTH_LOADING,
  SET_AUTH_TOKEN,
} from '../types';

export const registerUser = user => ({
  type: REGISTER_USER_SAGA,
  payload: user,
});

// Get error from dispatch, error object is form of axios response
export const registerUserError = error => ({
  type: REGISTER_USER_ERROR,
  payload: error,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

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
