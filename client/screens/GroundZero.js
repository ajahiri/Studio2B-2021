import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from './Dashboard';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function GroundZero() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',

        }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text style={{color: focused ? '#e32f45' : '#748c94'}}>DASHBOARD</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text style={{color: focused ? '#e32f45' : '#748c94'}}>PROFILE</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}
