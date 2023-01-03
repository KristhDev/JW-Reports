import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Revisits } from '../screens/revisits';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const RevisitsNavigation = () => {
    const { state: { colors } } = useTheme();

    const RevisitsScreen = () => <Revisits />;

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                },
                headerShown: false
            }}
        >
            <Stack.Screen
                name="RevisitsScreen"
                component={ RevisitsScreen }
            />
        </Stack.Navigator>
    );
}

export default RevisitsNavigation;