import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { connect, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

import {
  GroundZero,
  Login,
  TeacherCreateSession,
  TeacherViewSession,
  StudentJoinSession,
  reg_index,
} from '../screens';
import { setAuthToken, setUser } from '../redux/actions/authActions';

const Stack = createStackNavigator();

function AppNavigator(props) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync('userToken');

      if (token) {
        const userObject = jwtDecode(token);
        dispatch(setUser(userObject));
      }

      setIsLoading(false);
      dispatch(setAuthToken(token));
    }

    checkToken();
  }, [isLoading, setIsLoading]);

  const { authToken } = props.auth;

  return (
    <NavigationContainer>
      {authToken === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="RegisterIndex"
            component={reg_index}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="GroundZero"
            component={GroundZero}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TeacherViewSession"
            component={TeacherViewSession}
            options={{
              headerShown: true,
              title: 'Session Details',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="StudentJoinSession"
            component={StudentJoinSession}
            options={{
              headerShown: true,
              title: 'Join Session',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="TeacherCreateSession"
            component={TeacherCreateSession}
            options={{
              headerShown: true,
              title: 'Create New Session',
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(AppNavigator);
