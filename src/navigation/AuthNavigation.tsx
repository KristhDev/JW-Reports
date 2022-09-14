import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/auth';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="LoginScreen"
                component={ Login }
            />
        </Stack.Navigator>
    );
}

export default AuthNavigation;