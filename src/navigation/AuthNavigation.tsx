import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Login, Register } from '../screens/auth';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    const { top } = useSafeAreaInsets();

    const { state: { colors } } = useTheme();

    const LoginScreen = () => <Login />;
    const RegisterScreen = () => <Register />;

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