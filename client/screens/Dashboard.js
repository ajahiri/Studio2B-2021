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

import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = props => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const logo = require('../../client/assets/Login/Logo.png');

  const loadProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      props.navigation.navigate('Login');
    } else {
      const decoded = jwtDecode(token);
      setFullName(decoded.fullName);
      setEmail(decoded.email);
      console.log(decoded);
    }
  };

  const logout = props => {
    AsyncStorage.removeItem('token')
      .then(() => {
        props.navigation.replace('Login');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadProfile();
  });

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Text>Welcome {fullName ? fullName : ''}</Text>
        <Text>{email ? email : ''}</Text>
        <Button title="LogOut" onPress={() => logout(props)}></Button>
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
