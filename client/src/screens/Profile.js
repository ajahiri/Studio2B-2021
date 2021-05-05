import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '../components';
import { layout } from '../constants';

export default function Profile() {
  return (
    <SafeAreaView
      style={{ marginHorizontal: layout.defaultScreenMargins.horizontal }}>
      <Button style={{ marginBottom: 16 }} size="small" title="Edit Profile" />
      <Button type="danger" size="small" title="Log Out" />
    </SafeAreaView>
  );
}
