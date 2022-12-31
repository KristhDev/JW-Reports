import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AddOrEditPreaching, Home } from '../screens/preaching';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const HomeNavigation = () => {
    const { state: { colors } } = useTheme();

    const AddOrEditPreachingScreen = () => <AddOrEditPreaching />;
    const HomeScreen = () => <Home />;

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.background,
                },
                headerShown: false
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={ HomeScreen }
            />

            <Stack.Screen
                name="AddOrEditPreachingScreen"
                component={ AddOrEditPreachingScreen }
            />
        </Stack.Navigator>
    );
}

export default HomeNavigation;