import { RNS3 } from 'react-native-upload-aws-s3';
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_FACESEARCH_API } from '@env';
import axios from 'axios';

function handleFaceAuth(
  authType,
  uri,
  setBtnText,
  fileName,
  handleFaceAuthResponse,
) {
  console.log('!!!SAVING WITH FILENAME!!!', fileName);
  setBtnText(authType === 'register' ? 'Uploading...' : 'Authenticating...');
  const file = {
    uri,
    name: authType === 'register' ? fileName : 'auth-request',
    type: 'image/png',
  };

  const options = {
    bucket: authType === 'register' ? 'faceindexrico' : 'face-searchrico',
    region: 'us-east-2',
    accessKey: AWS_ACCESS_KEY,
    secretKey: AWS_SECRET_KEY,
    successActionStatus: 201,
  };

  // Status 1 = success, 2 = fail, message is reason
  // const response = {
  //   status: 0,
  //   message: '',
  //   data: '', // Will be the ID on successful auth
  // }

  try {
    RNS3.put(file, options).then(response => {
      if (authType === 'login') {
        axios.get(`${AWS_FACESEARCH_API}?filename=auth-request`).then(res => {
          if (res.data.IDs.length === 0)
            return handleFaceAuthResponse({
              status: 0,
              message: 'No facial authentication match was found.',
              data: null,
            });
          // TODO: On login this might change as the face detected may be associated with multiple accounts,
          // to handle this, we will change the client side check for login so that we check that the user ID
          // exists in the array rather than checking if each ID matches. i.e. the data attribute will now return
          // an array of user IDs instead of a single ID.
          else
            return handleFaceAuthResponse({
              status: 1,
              message: 'Successful login.',
              data: res.data.IDs.map(id => {
                return id.ExternalImageId;
              }),
            });
        });
      } else {
        if (response.status === 201) {
          // console.log('Successfully uploaded: ', response.body);
          return handleFaceAuthResponse({
            status: 1,
            message: 'Successfully registered user image.',
            data: null,
          });
        } else {
          console.log('Failed to upload image to S3: ', response);
          return handleFaceAuthResponse({
            status: 0,
            message: 'Failed to upload image to S3.',
            data: null,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return handleFaceAuthResponse({
      status: 0,
      message: 'Failed to upload image to S3.',
      data: null,
    });
  }
}

export default handleFaceAuth;
