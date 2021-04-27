import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
export default function SplashScreen() {
  const logo = require('../../client/assets/Login/Logo.png');

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={logo} />
          <Text style={styles.title}>AuthMe</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
