import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Button from './Button';
import { colours as C, layout as L, typography as T } from '../constants';

export default function ImageCapture(props) {

  // put the take photo btn in here and call the onSubmit function in reg_index inside of the updatePhoto function. 

  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState({});
  const [cameraReady, setCameraReady] = useState(false);
  const [savedImage, setSavedImage] = useState({});
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    (async () => {
      // request camera permission
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
      catch { err => console.log(err) }
    })();
  }, []);

  // check permissions
  if (hasPermission === null) {
    return <View><Text>Loading...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  FacesDetected = ({ faces }) => {
    const face = faces[0];
    if (!face) {  // if face is undefined
      setFaceDetected(false);
    } else {
      setFaceDetected(true);
    }
  }

  CameraReady = () => {
    setCameraReady(true);
  }

  takePhoto = async () => {
    try {
      if (camera && cameraReady) {
        let photo = await camera.takePictureAsync();
        setSavedImage(photo.uri);
        props.submitAll(photo.uri);
      }
    }
    catch { err => console.log(err) }
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          onCameraReady={CameraReady}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          autoFocus={true}
          onFacesDetected={FacesDetected}
          onFaceDetectionError={state => console.warn('Faces detection error:', state)}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            tracking: true
          }}
          onMountError={err => console.log(err)}
        // useCamera2Api={true}
        >
        </Camera>
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.photoButton} disabled={!faceDetected} onPress={takePhoto}> 
          <Text style={styles.buttonTextPhoto}>{faceDetected ? 'TAKE PHOTO' : 'Waiting for Face Detection...'}</Text>
        </TouchableOpacity>
      </View> */}
      <Button
        text={faceDetected ? 'TAKE PHOTO' : 'Waiting for Face Detection...'}
        disabled={!faceDetected}
        onPress={takePhoto}
        style={styles.formSubmitButton}
      />
    </View>
  );
}

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