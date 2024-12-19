import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

/* Modules */
import { AuthStackNavigation, useAuth } from '@auth';
import { useCourses } from '@courses';
import { useLessons } from '@lessons';
import { usePreaching } from '@preaching';
import { useRevisits } from '@revisits';
import { SettingsStackNavigation, StatusModal, useNetwork, usePermissions } from '@shared';
import { useTheme } from '@theme';
import { NavigationParamsList, useUI } from '@ui';

/* Navigation */
import MainTabsBottomNavigation from './MainTabsBottomNavigation';

const Stack = createStackNavigator<NavigationParamsList>();

/**
 * This a main navigation for app.
 *
 * @return {JSX.Element} rendered component to show navigation
 */
const Navigation = (): JSX.Element => {
    const { state: { isAuthenticated }, getAuth } = useAuth();
    const { clearCourses } = useCourses();
    const { clearLessons } = useLessons();
    const { checkPermissions } = usePermissions();
    const { clearPreaching } = usePreaching();
    const { clearRevisits } = useRevisits();
    const { state: { theme } } = useTheme();
    const { wifi } = useNetwork();
    const { listenHideKeyboard, listenShowKeyboard } = useUI();

    /**
     * Effect to clear store when mount component.
     */
    useEffect(() => {
        if (wifi.hasConnection) {
            clearCourses();
            clearLessons();
            clearPreaching();
            clearRevisits();

            getAuth();
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

    if (!isAuthenticated) {
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
                    <Stack.Screen
                        component={ AuthStackNavigation }
                        name="AuthStackNavigation"
                    />
                </Stack.Navigator>
            </>
        );
    }

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
            </Stack.Navigator>
        </>
    );
}

export default Navigation;