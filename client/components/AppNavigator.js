import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ImageAuthRegistration from '../screens/ImageAuthRegistration';
import Dashboard from '../screens/Dashboard';
import SplashScreen from '../screens/SplashScreen';
import { connect, useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';
import { setAuthToken, setUser } from '../redux/actions/authActions';

import jwt_decode from 'jwt-decode';

const Drawer = createDrawerNavigator();

const AppNavigator = props => {
  const [isLoading, setisLoading] = useState(true);

  const userToken = props.authToken;

  const dispatch = useDispatch();

  async function checkToken() {
    const token = await SecureStore.getItemAsync('userToken');
    console.log('Token from securestore', token);
    if (token) {
      const userObj = jwt_decode(token);
      dispatch(setUser(userObj));
      console.log('Usrobj from token', userObj);
    }
    setisLoading(false);
    setAuthToken(token);
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {userToken == null ? (
          <>
            <Drawer.Screen name="Login" component={Login} options={{}} />
            <Drawer.Screen name="Register" component={Register} options={{}} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Home" component={Home} />
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

const mapStateToProps = state => {
  return { authToken: state.auth.authToken };
};

export default connect(mapStateToProps)(AppNavigator);
