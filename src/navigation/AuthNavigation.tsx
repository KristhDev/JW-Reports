import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Login, Register } from '../screens/auth';

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
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false
            }}
        >
            <Stack.Screen
                name="LoginScreen"
                component={ Login }
            />

            <Stack.Screen
                name="RegisterScreen"
                component={ Register }
            />
        </Stack.Navigator>
    );
}

export default AuthNavigation;