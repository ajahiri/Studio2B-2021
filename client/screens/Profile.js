import React from 'react';
import { Alert, Text, View, Image, StyleSheet } from 'react-native';

import { connect, useDispatch } from 'react-redux';

import { Button, TextInput } from '../components';
import { font, layout } from '../constants';
import * as authActions from '../redux/actions/authActions';

import { Card } from '../components/cards';

const Profile = props => {
  //const fullName = `${firstName ?? '???'} ${lastName ?? '???'}`;
  console.log(props);
  const { user } = props;
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

  const noImage = require('../assets/Login/profile-placeholder.png');

  const referenceImageURL = () => {
    if (user._id) {
      return `https://faceindexrico.s3.us-east-2.amazonaws.com/${user._id}`;
    } else {
      return noImage.uri;
    }
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
        <Image source={{ uri: referenceImageURL() }} style={styles.image} />
        <View>
          <Text style={[font.mediumBold, { marginBottom: layout.spacing.lg }]}>
            Name: {`${user?.firstName} ${user?.lastName}`}
          </Text>
          <Text style={[font.mediumBold, { marginBottom: layout.spacing.lg }]}>
            Email: {user?.email}
          </Text>
          <Text style={[font.mediumBold, { marginBottom: layout.spacing.lg }]}>
            University: {user?.university}
          </Text>
        </View>
      </View>
      {/* <Button
        style={{ marginBottom: 16 }}
        size="small"
        title="Edit Profile"
        onPress={handleEditProfile}
      /> */}
      <Button
        type="danger"
        size="small"
        title="Log Out"
        onPress={handleLogout}
      />
    </View>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    height: 210,
    width: 210,
    marginBottom: layout.spacing.lg,
  },
});
