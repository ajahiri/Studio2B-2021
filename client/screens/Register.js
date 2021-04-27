import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import { Button } from '../components';
// import { color, font, layout } from '../constants';

export default function Register({ navigation }) {
  return (
    <SafeAreaView>
      <Text>REGISTER</Text>
      <Button title="Register" />
    </SafeAreaView>
  );
}
