import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useIsFocused } from '@react-navigation/core';

import Button from './Button';
import Banner from './Banner';

import handleFaceAuth from '../helpers/handleFaceAuth';
import { color, font, layout } from '../constants';

const ImageCapture = (props) => {
  const [faceRecoError, setFaceRecoError] = useState('');

  const [btnText, setBtnText] = useState('');

  // put the take photo btn in here and call the onSubmit function in reg_index inside of the updatePhoto function.

  const [hasPermission, setHasPermission] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [cameraInstance, setCameraInstance] = useState({});
  const [cameraReady, setCameraReady] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      // request camera permission
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch {
        (err) => console.log(err);
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

  // Response object structure
  // Status 1 = success, 2 = fail, message is reason
  // const response = {
  //   status: 0,
  //   message: '',
  //   data: '', // Will be the ID on successful auth
  // }
  const handleFaceAuthResponse = (response) => {
    setCaptureLoading(false);
    if (response?.status === 1) {
      // Handle any modal messages here
      props.onSubmission(response);
    } else {
      setFaceRecoError(response.message);
      props.onSubmission(response);
    }
  };

  const FacesDetected = ({ faces }) => {
    const face = faces[0];
    if (!face) {
      // if face is undefined
      setFaceDetected(false);
    } else {
      setFaceDetected(true);
    }
    handleBtnText();
  };

  const handleBtnText = () => {
    if (props.authType === 'register') {
      faceDetected ? setBtnText('Register') : setBtnText('Looking for Face...');
    } else {
      // authType === 'login'
      faceDetected
        ? setBtnText('Authenticate')
        : setBtnText('Looking for Face...');
    }
  };

  const takePhoto = (authType) => {
    //setModalVisible(true);
    if (cameraInstance && cameraReady) {
      setCaptureLoading(true);
      cameraInstance
        .takePictureAsync()
        .then((img) => {
          handleFaceAuth(
            authType,
            img.uri,
            setBtnText,
            props.userID,
            handleFaceAuthResponse,
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const cameraType = Camera.Constants.Type.front;

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.imageContainer}>
        {isFocused && (
          <Camera
            ref={(ref) => setCameraInstance(ref)}
            onCameraReady={() => setCameraReady(true)}
            style={styles.camera}
            type={cameraType}
            autoFocus={true}
            onFacesDetected={FacesDetected}
            onFaceDetectionError={(state) =>
              console.warn('Faces detection error:', state)
            }
            useCamera2Api={false}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.accurate,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              tracking: false,
            }}
            onMountError={(err) => console.log(err)}
          />
        )}
      </View>
      {!captureLoading && faceRecoError !== '' ? (
        <Banner type="error" message={faceRecoError} />
      ) : null}
      <View style={styles.buttonContainer}>
        <Button
          size="small"
          title={btnText}
          disabled={!faceDetected}
          onPress={() => takePhoto(props.authType)}
          isLoading={captureLoading}
          style={styles.formSubmitButton}
        />
      </View>
    </View>
  );
};

export default ImageCapture;

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
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formSubmitButton: {
    marginTop: layout.spacing.md,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
