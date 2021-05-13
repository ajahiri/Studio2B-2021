import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from './Dashboard';
import Profile from './Profile';
import { color } from '../constants';

const Tab = createBottomTabNavigator();

export default function GroundZero() {
  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: color.accentFocused }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            case 'Home': /* FALLTHROUGH */
            default:
              iconName = focused ? 'home' : 'home-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
