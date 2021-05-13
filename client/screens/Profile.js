import React from 'react';
import { Text, View } from 'react-native';

import { Button } from '../components';
import { font, layout } from '../constants';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

export default function Profile() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logoutUserSaga());
  };

  return (
    <View
      style={{
        marginTop: layout.defaultScreenMargins.vertical,
        marginHorizontal: layout.defaultScreenMargins.horizontal,
      }}>
      <Text style={[font.h3, { marginBottom: layout.spacing.lg }]}>
        My Profile
      </Text>
      <Button style={{ marginBottom: 16 }} size="small" title="Edit Profile" />
      <Button
        type="danger"
        size="small"
        title="Log Out"
        onPress={handleLogout}
      />
    </View>
  );
}
