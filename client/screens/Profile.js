import React from 'react';
import { Alert, Text, View, Image, StyleSheet } from 'react-native';

import { Button, TextInput } from '../components';
import { font, layout } from '../constants';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Card } from '../components/cards';

export default function Profile() {

  //const fullName = `${firstName ?? '???'} ${lastName ?? '???'}`;
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
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require("../assets/Login/profile-placeholder.png")} style={styles.image}/>
        <View>
          <Text style={[font.mediumBold, { marginBottom: layout.spacing.lg }]}>Name: </Text>
          <Text style={[font.mediumBold, { marginBottom: layout.spacing.lg }]}>Email: </Text>
          <Text style={[font.mediumBold, { marginBottom: layout.spacing.lg }]}>University: </Text>
        </View>
      </View>
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

const styles = StyleSheet.create({
  image: {
    borderRadius: 210,
    height: 210,
    width: 210,
    marginBottom: layout.spacing.lg,
  }
})
