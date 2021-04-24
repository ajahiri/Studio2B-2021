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
import ClassRoom from '../components/ClassRoom';

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
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text>Welcome {fullName ? fullName : ''}</Text>
          <Text>{email ? email : ''}</Text>
        </View>
      </View>
      <Button
        title="Create Session"
        onPress={() => console.log("create class")}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ViewClass')}>
        <ClassRoom/>
      </TouchableOpacity>
      <View>
        <Button
          title="LogOut"
          onPress={() => dispatch(logoutUserSaga())}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: "flex",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 48,
  },
});

export default Dashboard;
