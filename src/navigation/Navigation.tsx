import React, { useEffect } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthNavigation, MainNavigation } from './';

import { StatusModal } from '../screens/status';

import { useAuth, useRevisits, useStatus, useTheme } from '../hooks';

const Stack = createStackNavigator();

const Navigation = () => {
    const { state: { isAuthenticated }, renew } = useAuth();
    const { clearRevisits } = useRevisits();
    const { clearStatus } = useStatus();
    const { state: { theme }, setDefaultTheme } = useTheme();

    useEffect(() => {
        clearStatus();
        clearRevisits();
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
        <>
            <StatusBar
                animated
                backgroundColor="transparent"
                barStyle={ (theme === 'dark') ? 'light-content' : 'dark-content' }
                translucent
            />

            <StatusModal />

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    (isAuthenticated) ? (
                        <Stack.Screen
                            component={ MainNavigation }
                            name="MainNavigation"
                        />
                    ) : (
                        <Stack.Screen
                            component={ AuthNavigation }
                            name="AuthNavigation"
                        />
                    )
                }
            </Stack.Navigator>
        </>
    );
}

export default Navigation;