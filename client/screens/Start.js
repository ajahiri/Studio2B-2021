import React from 'react';
import RN, { StyleSheet } from 'react-native';

import { Button } from '../components';
import { colours as C, layout as L, typography as T } from '../constants';

export default function Start({ navigation }) {
  const welcomeBanner = require('../assets/Start/welcome-banner.jpg');

  return (
    <RN.View style={styles.pageContainer}>
      <RN.Image
        style={styles.welcomeBanner}
        resizeMode="cover"
        source={welcomeBanner}
      />
      <RN.SafeAreaView>
        <RN.View style={styles.welcomeContainer}>
          <RN.Text style={styles.welcomeSubtitle}>Welcome to</RN.Text>
          <RN.Text style={styles.welcomeTitle}>AuthMe</RN.Text>
          <RN.View>
            <Button
              text="Create account"
              onPress={() => navigation.navigate('Register')}
            />

            <RN.TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <RN.Text style={styles.loginText}>
                I already have an account
              </RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      </RN.SafeAreaView>
    </RN.View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    paddingBottom: L.spacing.xl,
    marginHorizontal: L.pageMarginHorizontal,
  },
  welcomeBanner: {
    flex: 1,
    width: '100%',
    marginBottom: L.spacing.xxl,
  },
  welcomeSubtitle: {
    fontSize: T.sizes.heading,
    fontFamily: T.fonts.medium,
    marginBottom: L.spacing.xs,
  },
  welcomeTitle: {
    color: C.primary,
    fontSize: T.sizes.title,
    fontFamily: T.fonts.bold,
    marginBottom: L.spacing.xl,
  },
  loginText: {
    alignSelf: 'center',
    color: C.darkGrey,
    fontSize: T.sizes.caption,
    marginTop: L.spacing.l,
  },
});
