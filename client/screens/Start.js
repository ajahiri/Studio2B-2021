import React from 'react';
import { SafeAreaView } from 'react-native';

import { Button } from '../components';

export default function Start({ navigation: _ }) {
  return (
    <SafeAreaView style={{ margin: 20, marginTop: 60 }}>
      <Button style={{ marginBottom: 20 }} primary title="#@$" />
      <Button style={{ marginBottom: 20 }} primary disabled title="AuthMe" />
      <Button style={{ marginBottom: 20 }} title="Secondary" />
      <Button
        style={{ marginBottom: 20 }}
        disabled
        title="Secondary Disabled"
      />

      <Button style={{ marginBottom: 20 }} small primary title="Primary" />
      <Button
        style={{ marginBottom: 20 }}
        small
        primary
        disabled
        title="Primary Disabled"
      />
      <Button style={{ marginBottom: 20 }} small title="Secondary" />
      <Button
        style={{ marginBottom: 20 }}
        small
        disabled
        title="Secondary Disabled"
      />
    </SafeAreaView>
  );
}
