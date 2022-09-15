import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { StatusBarLayout } from '../layouts';

import { Login, Register } from '../screens/auth';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    const { state: { colors } } = useTheme();

    const LoginScreen = () => (
        <StatusBarLayout backgroundColor={ colors.contentHeader }>
            <Login />
        </StatusBarLayout>
    );

    const RegisterScreen = () => (
        <StatusBarLayout backgroundColor={ colors.contentHeader }>
            <Register />
        </StatusBarLayout>
    );

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
                component={ LoginScreen }
            />

            <Stack.Screen
                name="RegisterScreen"
                component={ RegisterScreen }
            />
        </Stack.Navigator>
    );
}

export default AuthNavigation;