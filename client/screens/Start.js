import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { Button } from '../components';

export default function Start({ navigation: _ }) {
  return (
    <SafeAreaView>
      <Text>Welcome to</Text>
      <Text>AuthMe</Text>
      <Button primary title="Primary" />
      <Button primary disabled title="Primary Disabled" />
      <Button title="Secondary" />
      <Button disabled title="Secondary Disabled" />
    </SafeAreaView>
  );
}
