import React from 'react';
import {
  useWindowDimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from '../components';
import { color, font, layout } from '../constants';

const welcomeBanner = require('../../assets/Start/welcome-banner.jpg');

export default function Start({ navigation }) {
  const screenHeight = useWindowDimensions().height;
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          maxHeight: screenHeight / 2.25,
          width: '100%',
          borderRadius: layout.radius.lg,
        }}
        source={welcomeBanner}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: layout.defaultScreenMargins.horizontal,
          justifyContent: 'center',
        }}>
        <View style={{ marginTop: layout.spacing.lg }}>
          <Text style={{ ...font.h2 }}>Welcome to</Text>
          <Text style={{ ...font.title, color: color.accent }}>AuthMe</Text>
        </View>
        <View style={{ marginVertical: layout.spacing.xl }}>
          <Button
            style={startScreenStyles.button}
            primary
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            style={startScreenStyles.button}
            title="Create Account"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </View>
  );
}

const startScreenStyles = StyleSheet.create({
  button: {
    marginBottom: layout.spacing.lg,
  },
});
