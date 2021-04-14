import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ImageAuthRegistration from '../screens/ImageAuthRegistration';
import Dashboard from '../screens/Dashboard';
import TeacherDashboard from '../screens/TeacherDashboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="TeacherDashboard"
          component={TeacherDashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
