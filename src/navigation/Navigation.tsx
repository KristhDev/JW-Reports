import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AuthStackNavigation, MainTabsBottomNavigation, SettingsStackNavigation } from './';

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
    const { state: { selectedTheme, } } = useTheme();

    useEffect(() => {
        checkPermissions();
        clearStatus();

        clearCourses();
        clearRevisits();

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

    return (
        <>
            <StatusBar
                animated
                backgroundColor="transparent"
                barStyle={ (selectedTheme === 'dark') ? 'light-content' : 'dark-content' }
                translucent
            />

            <StatusModal />

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: {
                        // backgroundColor: '#000000'
                    }
                }}
            >
                {
                    (isAuthenticated) ? (
                        <>
                            <Stack.Screen
                                component={ MainTabsBottomNavigation }
                                name="MainTabsBottomNavigation"
                            />

                            <Stack.Screen
                                component={ SettingsStackNavigation }
                                name="SettingsStackNavigation"
                                options={{
                                    cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                                }}
                            />
                        </>
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