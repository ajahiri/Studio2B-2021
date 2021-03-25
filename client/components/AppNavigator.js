import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard';
import ImageAuthRegistration from '../screens/ImageAuthRegistration';
import Login from '../screens/Login';
import Register from '../screens/Register';
import SplashScreen from '../screens/SplashScreen';
import { connect, useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';
import { setAuthToken, setUser } from '../redux/actions/authActions';

import jwt_decode from 'jwt-decode';

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator>
        {userToken == null ? (
          <>
            <Drawer.Screen name="Register" component={Register} options={{}} />
            <Drawer.Screen name="Login" component={Login} options={{}} />
          </>
        ) : (
          <>
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
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(AppNavigator);
