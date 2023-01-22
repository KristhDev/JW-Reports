import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Profile, ResetPassword } from '../screens/auth';
import { Settings } from '../screens/ui';

import { BackButton } from '../components/ui';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const SettingsStackNavigation = () => {
    const { state: { colors } } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerLeft: ({ onPress }) => <BackButton color={ colors.icon } onPress={ onPress } />,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.background,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                component={ Settings }
                name="SettingsScreen"
                options={{
                    title: 'JW Reports'
                }}
            />

            <Stack.Screen
                component={ Profile }
                name="ProfileScreen"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    title: 'Perfil'
                }}
            />

            <Stack.Screen
                component={ ResetPassword }
                name="ResetPasswordScreen"
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    title: 'Cambiar contraseña'
                }}
            />
        </Stack.Navigator>
    );
}

export default SettingsStackNavigation;