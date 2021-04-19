import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function ImageUpload() {

  const [hasPermission, setHasPermission] = useState(null);
  const [hasCamera, setHasCamera] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceText, setFaceText] = useState('Waiting for Face Detection...');

  useEffect(() => {
    (async () => {
      // check camera exists
      try {
        const { avaialbaleCamera } = async () => await Camera.isAvailableAsync();
        setHasCamera(avaialbaleCamera);
      }
      catch { err => console.log(err) }

      // request camera permission
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
      catch { err => console.log(err) }
    })();
  }, []);

  // check permissions
  if (hasPermission === null || hasCamera === null) {
    return <View><Text>Loading...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }
  if (hasCamera === false) {
    return <Text>No camera has been detected.</Text>
  }

  onFacesDetected2 = ( {faces} ) => {
    const face = faces[0];
    console.log(face);
    if (faces.length !== 0) {
      //console.log(faces)
      setFaceText('TAKE PHOTO');
    } else {
      setFaceText('Waiting for Face Detection...')
    }
    // if (face.faceID > 1) {
    //   setFaceText('Too many faces in frame...');
    // }
  }
  return (
    <View>
      <View style={styles.imageContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          autoFocus={true}
          onFacesDetected={onFacesDetected2}
          onFaceDetectionError={state => console.warn('Faces detection error:', state)}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: true,
            tracking: true
          }}
        // useCamera2Api={true}
        >
        </Camera>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.photoButton}> 
          <Text style={styles.buttonTextPhoto}>{faceText}</Text>
        </TouchableOpacity>
      </View>
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
});