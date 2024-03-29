import { useLinkProps } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';

import { ImageCapture } from '../../components/index';
import { authUserError, setAuthToken } from '../../redux/actions/authActions';

export default function ImageAuthRegistration(props) {
  const returnImage = require('../../assets/Login/Union.png');
  const imagePlaceholder = require('../../assets/Login/profile-placeholder.png');
  const dispatch = useDispatch();

  const onSubmission = result => {
    console.log(result);
    if (result?.status === 1) {
      console.log(
        'success register image, setting user token:',
        props.userToken,
      );
      SecureStore.setItemAsync('userToken', props.userToken).then(token => {
        dispatch(setAuthToken(token));
        dispatch(authUserError(''));
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Image Authentication</Text>
        <Text style={styles.desc}>
          In order to register your account, you’re required to upload a facial
          image. This image will be used for future authentication.
        </Text>
      </View>
      <ImageCapture
        userID={props.userID}
        authType="register"
        onSubmission={onSubmission}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  //returnImage not used
  returnImage: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  returnButton: {
    width: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 10,
  },
  desc: {
    fontSize: 15,
    textAlign: 'center',
  },
  textContainer: {
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#3D3ABF',
    overflow: 'hidden',
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

  nextButton: {
    height: 52,
    backgroundColor: '#3D3ABF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
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
  buttonText: {
    color: '#FFFFFF',
    margin: 'auto',
    fontWeight: 'bold',
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
});
