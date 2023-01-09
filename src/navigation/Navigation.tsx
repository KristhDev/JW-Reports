import React, { useEffect } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackNavigation, MainTabsBottomNavigation } from './';

import { StatusModal } from '../screens/status';

import { useAuth, useRevisits, useStatus, useTheme } from '../hooks';

import { NavigationParamsList } from '../interfaces/ui';

const Stack = createStackNavigator<NavigationParamsList>();

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
                            component={ MainTabsBottomNavigation }
                            name="MainTabsBottomNavigation"
                        />
                    ) : (
                        <Stack.Screen
                            component={ AuthStackNavigation }
                            name="AuthStackNavigation"
                        />
                    )
                }
            </Stack.Navigator>
        </>
    );
}

export default Navigation;