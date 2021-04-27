import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import Button from './Button';
import { colours as C, layout as L, typography as T } from '../constants';

import * as cameraActions from '../redux/actions/cameraActions';
import * as authActions from '../redux/actions/authActions';

import { RNS3 } from 'react-native-upload-aws-s3';
import TextInput from './TextInput';

const ImageCapture = props => {
  const [name, onChangeName] = useState('Test');

  const dispatch = useDispatch();
  const { cameraReady } = props;

  // put the take photo btn in here and call the onSubmit function in reg_index inside of the updatePhoto function.

  const [hasPermission, setHasPermission] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [cameraInstance, setCameraInstance] = useState({});

  useEffect(() => {
    (async () => {
      // request camera permission
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch {
        err => console.log(err);
      }
    })();
  }, []);

  // check permissions
  if (hasPermission === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  const FacesDetected = ({ faces }) => {
    const face = faces[0];
    if (!face) {
      // if face is undefined
      setFaceDetected(false);
    } else {
      setFaceDetected(true);
    }
  };

  const takePhoto = () => {
    if (cameraInstance && cameraReady) {
      dispatch(authActions.setAuthIsLoading(true));
      //dispatch(cameraActions.imgURI(cameraInstance.takePictureAsync()));
      cameraInstance
        .takePictureAsync()
        .then(img => {
          dispatch(cameraActions.imgURI(img.uri));
          uploadToS3(img.uri);
          dispatch(cameraActions.capturedImage(true));
          props.submitAll();
        })
        .catch(err => console.log(err));
    }
  };

  async function uploadToS3(uri) {
    const file = {
      uri,
      name,
      type: 'image/png',
    };

    const options = {
      bucket: 'faceindexrico',
      region: 'us-east-2',
      accessKey: 'AKIAQQ4SGZXPNCHN4JVO',
      secretKey: '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',
      successActionStatus: 201,
    };

    try {
      const response = await RNS3.put(file, options);
      if (response.status === 201) {
        console.log('Successfully uploaded: ', response.body);
      } else {
        console.log('Failed to upload image to S3: ', response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        <Camera
          //ref={ref => setCameraInstance(ref)}
          ref={ref => setCameraInstance(ref)}
          onCameraReady={() => dispatch(cameraActions.cameraReady(true))}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          autoFocus={true}
          onFacesDetected={FacesDetected}
          onFaceDetectionError={state =>
            console.warn('Faces detection error:', state)
          }
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            tracking: true,
          }}
          onMountError={err => console.log(err)}></Camera>
      </View>
      <TextInput
        onChangeText={onChangeName}
        value={name}
        style={{
          borderColor: 'blue',
          borderWidth: 1,
          margin: 10,
          padding: 20,
        }}></TextInput>
      <View style={styles.buttonContainer}>
        <Button
          text={
            faceDetected && name
              ? 'TAKE PHOTO'
              : 'Waiting for Face Detection...'
          }
          disabled={!faceDetected}
          onPress={takePhoto}
          style={styles.formSubmitButton}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    cameraReady: state.camera.cameraReady,
  };
};

export default connect(mapStateToProps)(ImageCapture);

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    display: 'flex',
    flexDirection: 'row',
  },
  camera: {
    flex: 0.7,
  },
  flipButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  photoButton: {
    height: 52,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonTextPhoto: {
    color: 'black',
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 300,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formSubmitButton: {
    marginTop: L.spacing.m,
  },
});
