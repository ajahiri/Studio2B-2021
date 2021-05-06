import React from 'react';
import { View } from 'react-native';

export default function Decorator({ children }) {
  return <View style={{ margin: 20 }}>{children}</View>;
}
