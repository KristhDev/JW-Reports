import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

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
        </Stack.Navigator>
    );
}

export default SettingsStackNavigation;