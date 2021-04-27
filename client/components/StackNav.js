import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/Dashboard';
import ViewClass from '../screens/ViewClass';

const Stack = createStackNavigator();

const StackNav = props => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                      headerShown: true,
                    }}
                />
                <Stack.Screen
                    name="ViewClass"
                    component={ViewClass}
                    options={{
                      headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNav;