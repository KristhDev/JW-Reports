import React, { useEffect } from 'react';
import { Appearance, AppState, StatusBar } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthStackNavigation, MainTabsBottomNavigation, SettingsStackNavigation } from './';

import { StatusModal } from '../screens/status';

import { useAuth, useCourses, usePermissions, useRevisits, useStatus, useTheme } from '../hooks';

import { Theme } from '../interfaces/theme';
import { NavigationParamsList } from '../interfaces/ui';

const Stack = createStackNavigator<NavigationParamsList>();

const Navigation = () => {
    const { state: { isAuthenticated }, renew } = useAuth();
    const { checkPermissions } = usePermissions();
    const { clearCourses } = useCourses();
    const { clearRevisits } = useRevisits();
    const { clearStatus } = useStatus();
    const { state: { selectedTheme, theme: appTheme }, setDefaultTheme, setTheme } = useTheme();

    useEffect(() => {
        checkPermissions();
        clearStatus();

        clearCourses();
        clearRevisits();

        AsyncStorage.getItem('jw-reports-theme').then(theme => {
            console.log(theme);
            setTheme(theme as Theme || 'default');
        });

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
            (appTheme === 'default') && setDefaultTheme();
        });

        return () => {
            unSubscribeTheme.remove();
        }
    }, [ appTheme ]);

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
                    headerShown: false
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