import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import { connect, useDispatch } from 'react-redux';

import { Button } from '../components';
import { color, font, layout } from '../constants';

const defaultAvatar = require('../assets/Login/profile-placeholder.png');
const AVATAR_DIAMETER = 250;

const Profile = (props) => {
  const {
    user: {
      _id: userId,
      firstName = '???',
      lastName = '???',
      university = '<university>',
      email = '<email>',
    },
  } = props;

  const avatarUri = {
    uri: `https://faceindexrico.s3.us-east-2.amazonaws.com/${userId}`,
  };

  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

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

  const onImageLoad = (loadEvent) => {
    if (loadEvent) setIsImageLoaded(true);
  };

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.userDetailsContainer}>
        <Image
          style={profileStyles.avatar}
          onLoad={onImageLoad}
          source={isImageLoaded ? avatarUri : defaultAvatar}
          resizeMode="cover"
        />
        <Text style={profileStyles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={profileStyles.caption}>{email}</Text>
        <Text style={profileStyles.caption}>Attends {university}</Text>
      </View>
      <Button
        style={{ marginBottom: layout.spacing.lg }}
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
};

const profileStyles = StyleSheet.create({
  container: {
    marginTop: layout.defaultScreenMargins.vertical,
    marginHorizontal: layout.defaultScreenMargins.horizontal,
  },
  userDetailsContainer: {
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  avatar: {
    width: AVATAR_DIAMETER,
    height: AVATAR_DIAMETER,
    borderRadius: AVATAR_DIAMETER / 2,
    marginVertical: layout.spacing.lg,
    borderWidth: layout.border.thick,
    borderColor: color.black,
  },
  name: {
    ...font.h2,
    marginBottom: layout.spacing.sm,
  },
  caption: {
    ...font.medium,
    color: color.gray500,
    marginBottom: layout.spacing.sm,
  },
});

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(Profile);
