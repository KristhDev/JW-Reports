import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigation from './AuthNavigation';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="AuthNavigation"
                component={ AuthNavigation }
            />
        </Stack.Navigator>
    );
}

export default Navigation;