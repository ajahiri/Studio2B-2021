import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';

const jwtDecode = require('jwt-decode');

import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { logoutUserSaga } from '../redux/actions/authActions';

const Dashboard = props => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const logo = require('../../client/assets/Login/Logo.png');

  const loadProfile = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    if (!token || token === '') {
      // props.navigation.navigate('Login');
    } else {
      const decoded = jwtDecode(token);
      setFullName(decoded.fullName);
      setEmail(decoded.email);
    }
  };

  useEffect(() => {
    loadProfile();
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Text>Welcome {fullName ? fullName : ''}</Text>
        <Text>{email ? email : ''}</Text>
        <Button
          title="LogOut"
          onPress={() => dispatch(logoutUserSaga())}></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  view: {
    flexDirection: 'column',
    flex: 1,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  logoImage: {
    height: 38,
    width: 38,
    marginRight: 20,
  },
  title: {
    fontSize: 48,
  },
});

export default Dashboard;
