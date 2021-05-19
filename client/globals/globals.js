import { API_URL } from '@env';

export const resolveBaseURL = () => {
  if (API_URL) {
    console.log(`Found API_URL in environment file. Using: http://${API_URL}`);
    return `http://${API_URL}`;
  } else {
    const defaultURL = 'https://authme.arianjahiri.com:3000';
    console.log(
      'Environment variable for API_URL not found. Using default: ',
      defaultURL,
    );
    return defaultURL;
  }
};

export function wait(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}
