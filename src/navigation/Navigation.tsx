import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

/* Modules */
import { NavigationParamsList, useUI } from '../modules/ui';
import { AuthStackNavigation, useAuth } from '../modules/auth';
import { SettingsStackNavigation, StatusModal, useNetwork, usePermissions } from '../modules/shared';
import { useCourses } from '../modules/courses';
import { useLessons } from '../modules/lessons';
import { usePreaching } from '../modules/preaching';
import { useRevisits } from '../modules/revisits';
import { useTheme } from '../modules/theme';

/* Navigation */
import MainTabsBottomNavigation from './MainTabsBottomNavigation';

/* Services */
import { notifications } from '../services';

const Stack = createStackNavigator<NavigationParamsList>();

/**
 * This a main navigation for app.
 *
 * @return {JSX.Element} rendered component to show navigation
 */
const Navigation = (): JSX.Element => {
    const { state: { isAuthenticated }, refreshAuth } = useAuth();
    const { clearCourses } = useCourses();
    const { clearLessons } = useLessons();
    const { state: { permissions }, checkPermissions } = usePermissions();
    const { clearPreaching } = usePreaching();
    const { clearRevisits } = useRevisits();
    const { state: { theme } } = useTheme();
    const { wifi } = useNetwork();
    const { listenHideKeyboard, listenShowKeyboard } = useUI();

    /**
     * Effect to clear store when mount component.
     */
    useEffect(() => {
        checkPermissions();

        if (wifi.hasConnection) {
            clearCourses();
            clearLessons();
            clearPreaching();
            clearRevisits();

            refreshAuth();
        }
    }, []);

    /**
     * Effect to listen keyboard.
     */
    useEffect(() => {
        const showListener = listenShowKeyboard();
        const hideListener = listenHideKeyboard();

        return () => {
            showListener.remove();
            hideListener.remove();
        }
    }, []);

    /**
     * Effect to request permission for notifications.
     */
    useEffect(() => {
        if (permissions.notifications === 'denied') return;
        notifications.requestPermission();
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
                barStyle={ (theme === 'dark') ? 'light-content' : 'dark-content' }
                translucent
            />

            <StatusModal />

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { (isAuthenticated) ? (
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
                ) }
            </Stack.Navigator>
        </>
    );
}

export default Navigation;