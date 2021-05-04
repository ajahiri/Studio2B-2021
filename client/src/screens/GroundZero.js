import React from 'react';
import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function GroundZero() {
  return (
    <>
      <Tab.Screen name="Dashboard" children={() => <Text>Dashboard</Text>} />
      <Tab.Screen name="Profile" children={() => <Text>Profile</Text>} />
    </>
  );
}
