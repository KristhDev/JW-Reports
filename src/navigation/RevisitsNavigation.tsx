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
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ RevisitsScreen }
                name="RevisitsScreen"
                options={{ title: 'Revisitas' }}
            />
        </Stack.Navigator>
    );
}

export default RevisitsNavigation;