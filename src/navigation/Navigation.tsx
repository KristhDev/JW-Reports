import React, { useEffect } from 'react';
import { Appearance, AppState, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackNavigation, MainTabsBottomNavigation } from './';

import { StatusModal } from '../screens/status';

import { useAuth, useCourses, usePermissions, useRevisits, useStatus, useTheme } from '../hooks';

import { NavigationParamsList } from '../interfaces/ui';

const Stack = createStackNavigator<NavigationParamsList>();

const Navigation = () => {
    const { state: { isAuthenticated }, renew } = useAuth();
    const { checkPermissions } = usePermissions();
    const { clearCourses } = useCourses();
    const { clearRevisits } = useRevisits();
    const { clearStatus } = useStatus();
    const { state: { theme }, setDefaultTheme } = useTheme();

    useEffect(() => {
        checkPermissions();
        clearStatus();

        clearCourses();
        clearRevisits();

        setDefaultTheme();
        renew();
    }, []);

    useEffect(() => {
        const unSubscribreAppState = AppState.addEventListener('change', async (state) => {
            if (state !== 'active') return;
            checkPermissions();
        });

        return () => {
            unSubscribreAppState.remove();
        }
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