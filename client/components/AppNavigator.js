import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/Dashboard';
import ImageAuthRegistration from '../screens/ImageAuthRegistration';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import SplashScreen from '../screens/SplashScreen';
import { connect, useDispatch } from 'react-redux';

import StackNav from './StackNav';

import * as SecureStore from 'expo-secure-store';
import { setAuthToken, setUser } from '../redux/actions/authActions';

import jwt_decode from 'jwt-decode';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = props => {
  const [isLoading, setisLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function checkToken() {
      let token = null;
      token = await SecureStore.getItemAsync('userToken');
      if (token) {
        const userObj = jwt_decode(token);
        dispatch(setUser(userObj));
      } else {
        token = null;
      }
      setisLoading(false);
      dispatch(setAuthToken(token));
    }
    checkToken();
  }, [isLoading, setisLoading]);

  if (isLoading) {
    return <SplashScreen />;
  }

  const { authToken: userToken } = props.auth;

  return (
    <NavigationContainer>
      {userToken == null ? (
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
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Dashboard"
            component={StackNav}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="ImageAuthRegistration"
            component={ImageAuthRegistration}
            options={{
              headerShown: true,
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
            }}
          />
        </Drawer.Navigator>
        // <Stack.Navigator>
        //   <Stack.Screen
        //     name="ViewClass"
        //     component={ViewClass}
        //     options={{
        //       headerShown: true,
        //     }}
        //   />
        // </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(AppNavigator);
