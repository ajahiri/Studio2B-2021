import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Button } from '../components';

export default function Start({ navigation }) {
  return (
    <SafeAreaView style={styles.pageContainer}>
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
  buttonGroup: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
});
