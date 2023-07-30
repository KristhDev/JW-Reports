import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

/* Navigation */
import { AuthStackNavigation, MainTabsBottomNavigation, SettingsStackNavigation } from './';

/* Screens */
import { StatusModal } from '../screens/status';

/* Hooks */
import { useAuth, useCourses, useNetwork, usePermissions, usePreaching, useRevisits, useStatus, useTheme } from '../hooks';

/* Interfaces */
import { NavigationParamsList } from '../interfaces/ui';

const Stack = createStackNavigator<NavigationParamsList>();

/**
 * This a main navigation for app.
 *
 * @return {JSX.Element} rendered component to show navigation
 */
const Navigation = (): JSX.Element => {
    const { state: { isAuthenticated }, renew } = useAuth();
    const { checkPermissions } = usePermissions();
    const { clearCourses } = useCourses();
    const { clearPreaching } = usePreaching();
    const { clearRevisits } = useRevisits();
    const { clearStatus } = useStatus();
    const { state: { selectedTheme, } } = useTheme();
    const { isConnected } = useNetwork();

    /**
     * Effect to clear store when mount component.
     */
    useEffect(() => {
        checkPermissions();
        clearStatus();

        if (isConnected) {
            clearCourses();
            clearPreaching();
            clearRevisits();

            renew();
        }
    }, []);

    /**
     * Effect to check permissions when change AppState.
     */
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