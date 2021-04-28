import { RNS3 } from 'react-native-upload-aws-s3';
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_FACESEARCH_API } from '@env';
import axios from 'axios';

async function handleFaceAuth(authType, uri, name) {
  const file = {
    uri,
    name: authType === 'register' ? name : 'auth-request',
    type: 'image/png',
  };

  const options = {
    bucket: authType === 'register' ? 'faceindexrico' : 'face-searchrico',
    region: 'us-east-2',
    accessKey: AWS_ACCESS_KEY,
    secretKey: AWS_SECRET_KEY,
    successActionStatus: 201,
  };

  try {
    RNS3.put(file, options).then(response => {
      if (authType === 'login') {
        axios.get(`${AWS_FACESEARCH_API}?filename=auth-request`).then(res => {
          console.log('Matched student', res.data.IDs[0].ExternalImageId);
        });
      } else {
        if (response.status === 201) {
          console.log('Successfully uploaded: ', response.body);
        } else {
          console.log('Failed to upload image to S3: ', response);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export default handleFaceAuth;
