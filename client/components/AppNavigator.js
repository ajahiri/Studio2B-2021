import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { colours as C } from '../constants';

import Dashboard from '../screens/Dashboard';
import Home from '../screens/Home';
import ImageAuthRegistration from '../screens/ImageAuthRegistration';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Start from '../screens/Start';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: C.white } }}>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerLeft: null }}
        />
        <Stack.Screen
          name="ImageAuthRegistration"
          component={ImageAuthRegistration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
