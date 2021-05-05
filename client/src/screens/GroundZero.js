import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from './Dashboard';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function GroundZero() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
