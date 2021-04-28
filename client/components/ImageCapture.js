import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import Button from './Button';
import { colours as C, layout as L, typography as T } from '../constants';

import * as cameraActions from '../redux/actions/cameraActions';
import * as authActions from '../redux/actions/authActions';

import TextInput from './TextInput';
import handleFaceAuth from '../helpers/handleFaceAuth';

const ImageCapture = props => {
  const [name, onChangeName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('Running facial auth...');

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

  const setPopupText = text => {
    setModalMessage(text);
  };

  const takePhoto = authType => {
    setModalVisible(true);
    if (cameraInstance && cameraReady) {
      dispatch(authActions.setAuthIsLoading(true));
      //dispatch(cameraActions.imgURI(cameraInstance.takePictureAsync()));
      cameraInstance
        .takePictureAsync()
        .then(async img => {
          dispatch(cameraActions.imgURI(img.uri));

          handleFaceAuth(
            authType,
            img.uri,
            authType === 'register' && name,
            setPopupText,
          );

          dispatch(cameraActions.capturedImage(true));
          props.submitAll();
        })
        .catch(err => console.log(err));
    }
  };

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
        placeholder="Username"
        style={{
          borderColor: 'blue',
          borderWidth: 1,
          margin: 10,
          padding: 20,
        }}></TextInput>
      <View style={styles.buttonContainer}>
        <Button
          text={
            faceDetected && name ? 'REGISTER' : 'Waiting for Face Detection...'
          }
          disabled={!(faceDetected && name)}
          onPress={() => takePhoto('register')}
          style={styles.formSubmitButton}
        />
        <Button
          text={faceDetected ? 'LOGIN' : 'Waiting for Face Detection...'}
          disabled={!faceDetected}
          onPress={() => takePhoto('login')}
          style={styles.formSubmitButton}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable
              style={[styles.modalButton, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingTop: 10,
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
