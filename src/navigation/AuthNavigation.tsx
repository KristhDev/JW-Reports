import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/auth';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    const { state: { colors } } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.contentHeader
                },
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