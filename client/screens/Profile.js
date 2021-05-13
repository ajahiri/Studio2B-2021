import React from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '../components';
import { font, layout } from '../constants';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

export default function Profile() {
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    Alert.alert(
      'Feature Unavailable',
      'Sorry, this feature is not available at the moment.',
    );
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Log Out', onPress: () => dispatch(authActions.logoutUser()) },
      { text: 'Cancel', style: 'cancel' },
    ]);
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
      <Button
        style={{ marginBottom: 16 }}
        size="small"
        title="Edit Profile"
        onPress={handleEditProfile}
      />
      <Button
        type="danger"
        size="small"
        title="Log Out"
        onPress={handleLogout}
      />
    </View>
  );
}
