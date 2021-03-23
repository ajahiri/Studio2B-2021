import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { typography as T } from '../constants';
import { Button } from '../components';

export default function Start({ navigation }) {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.headingText}>Welcome</Text>
      <View style={styles.buttonGroup}>
        <Button
          style={{ width: '50%' }}
          secondary
          text="Login"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          style={{ width: '50%' }}
          text="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    marginHorizontal: 22,
    marginVertical: 60,
  },
  headingText: {
    fontSize: T.sizes.title,
    fontWeight: '700',
  },
  buttonGroup: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
});
