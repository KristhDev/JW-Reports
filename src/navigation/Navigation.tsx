import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigation from './AuthNavigation';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const Navigation = () => {
    const { setDefaultTheme } = useTheme();

    useEffect(() => {
        setDefaultTheme();
    }, []);

    useEffect(() => {
        const unSubscribeTheme = Appearance.addChangeListener(() => {
            setDefaultTheme();
        });

        return () => {
            unSubscribeTheme.remove();
        }
    }, []);

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