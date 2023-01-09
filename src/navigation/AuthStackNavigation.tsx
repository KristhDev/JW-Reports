import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Login, Register } from '../screens/auth';

import { useTheme } from '../hooks';

import { AuthStackParamsList } from '../interfaces/auth';

const Stack = createStackNavigator<AuthStackParamsList>();

const AuthStackNavigation = () => {
    const { top } = useSafeAreaInsets();

    const { state: { colors } } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                    paddingTop: top
                },
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

export default AuthStackNavigation;