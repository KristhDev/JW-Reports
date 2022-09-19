import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigation from './AuthNavigation';
import PreachingNavigation from './PreachingNavigation';

import { useAuth, useStatus, useTheme } from '../hooks';

const Stack = createStackNavigator();

const Navigation = () => {
    const { state: { isAuthenticated }, renew } = useAuth();
    const { clearStatus } = useStatus();
    const { setDefaultTheme } = useTheme();

    useEffect(() => {
        clearStatus();
        setDefaultTheme();
        renew();
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
            {
                (isAuthenticated) ? (
                    <Stack.Screen
                        name="PreachingNavigation"
                        component={ PreachingNavigation }
                    />
                ) : (
                    <Stack.Screen
                        name="AuthNavigation"
                        component={ AuthNavigation }
                    />
                )
            }
        </Stack.Navigator>
    );
}

export default Navigation;