import React from 'react';
import { Image, Text, View } from 'react-native';

export default function SplashScreen() {
  const logo = require('../assets/Login/Logo.png');

  return (
    <View>
      <Image source={logo} />
      <Text>SPLASH SCREEN</Text>
    </View>
  );
}
