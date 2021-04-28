import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Button } from '../components';

export default function Dashboard({ navigation: _, ...props }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(authActions.getThisUserSaga());
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logoutUserSaga());
  };

  const {
    userFullName = 'NULL',
    userUniversity = 'NULL',
    permissionLevel = 'student',
    userEmail = 'NULL',
  } = props;

  return (
    <SafeAreaView>
      <Text>MY DASHBOARD</Text>
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
      <Button title="Log Out" onPress={handleLogout} />
    </SafeAreaView>
  );
}
