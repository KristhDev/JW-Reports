import React, { useEffect } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthNavigation, MainNavigation } from './';

import { StatusModal } from '../screens/status';

import { useAuth, useStatus, useTheme } from '../hooks';

const Stack = createStackNavigator();

const Navigation = () => {
    const { state: { isAuthenticated }, renew } = useAuth();
    const { clearStatus } = useStatus();
    const { state: { theme }, setDefaultTheme } = useTheme();

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
        <>
            <StatusBar
                animated
                backgroundColor="transparent"
                translucent
                barStyle={ (theme === 'dark') ? 'light-content' : 'dark-content' }
            />

            <StatusModal />

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    (!isAuthenticated) ? (
                        <Stack.Screen
                            name="MainNavigation"
                            component={ MainNavigation }
                        />
                    ) : (
                        <Stack.Screen
                            name="AuthNavigation"
                            component={ AuthNavigation }
                        />
                    )
                }
            </Stack.Navigator>
        </>
    );
}

export default Navigation;