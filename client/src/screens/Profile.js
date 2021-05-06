import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '../components';
import { layout } from '../constants';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

export default function Profile() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logoutUserSaga());
  };

  return (
    <SafeAreaView
      style={{ marginHorizontal: layout.defaultScreenMargins.horizontal }}>
      <Button style={{ marginBottom: 16 }} size="small" title="Edit Profile" />
      <Button
        type="danger"
        size="small"
        title="Log Out"
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
}
