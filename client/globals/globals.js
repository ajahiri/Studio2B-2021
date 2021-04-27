import { API_URL } from '@env';

export const resolveBaseURL = () => {
  if (API_URL) {
    console.log('Found BASE_API_URL in environment file. Using:', `http://${API_URL}`);
    return `http://${API_URL}`;
  } else {
    const defaultURL = 'http://authme.arianjahiri.com:3000';
    console.log(
      'Environment variable for BASE_API_URL not found. Using default: ',
      defaultURL,
    );
    return defaultURL;
  }
};
