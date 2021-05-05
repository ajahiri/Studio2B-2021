import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/Dashboard';
import ViewClass from '../screens/ViewClass';

const Stack = createStackNavigator();

const StackNav = props => {
    return(
        <>
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
        </>
    )
}

export default StackNav;