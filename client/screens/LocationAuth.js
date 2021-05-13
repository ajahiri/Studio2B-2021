import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import * as Location from 'expo-location';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { ImageCapture } from '../components';

const LocationAuth = props => {
  const { user } = props;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onSubmission = result => {};

  return (
    <SafeAreaView>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Location Authentication</Text>
        <Text style={styles.desc}>{text}</Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(LocationAuth);

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
    paddingTop: 60,
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
