import React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ImageAuthRegistration from '../screens/ImageAuthRegistration';
import Dashboard from '../screens/Dashboard';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} options={{}} />
        <Drawer.Screen name="Register" component={Register} options={{}} />
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="ImageAuthRegistration"
          component={ImageAuthRegistration}
          options={{
            headerShown: true,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
