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
import { useDispatch, connect } from 'react-redux';
import { logoutUserSaga, getThisUserSaga } from '../redux/actions/authActions';

const Dashboard = props => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const logo = require('../../client/assets/Login/Logo.png');

  const loadProfile = async () => {
    // const token = await SecureStore.getItemAsync('userToken');
    // if (token && token !== '') {
    //   const decoded = jwtDecode(token);
    //   setFullName(decoded.fullName);
    //   setEmail(decoded.email);
    // }
    dispatch(getThisUserSaga());
  };

  const onCreateNewSession = () => {
    props.navigation.navigate('CreateClass');
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const { userFullName, userUniversity, permissionLevel, userEmail } = props;

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <Text>Welcome {userFullName || ''}</Text>
        <Text>
          Contact: {userEmail} of {userUniversity}
        </Text>
        {permissionLevel === 'student' ? (
          <Text>Student View:</Text>
        ) : (
          <>
            <Text>Teacher View:</Text>
            <Button
              title="Create a New Session"
              onPress={onCreateNewSession}></Button>
          </>
        )}
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

const mapStateToProps = (state, ownProps) => {
  const { user } = state.auth;
  return {
    userFullName: `${user.firstName} ${user.lastName}`,
    userEmail: user.email,
    permissionLevel: user.permissionLevel,
    currentSessions: user.sessions,
    userUniversity: user.university,
  };
};

export default connect(mapStateToProps)(Dashboard);
