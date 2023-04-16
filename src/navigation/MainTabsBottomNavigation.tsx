import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OneSignal from 'react-native-onesignal';

/* Navigations */
import { PreachingStackNavigation } from './';
import { CoursesStackNavigation } from './courses';
import { RevistsStackNavigation } from './revisits';

/* Components */
import { TabBar } from '../components/ui';

/* Hooks */
import { useAuth, useTheme } from '../hooks';

/* Interfaces */
import { MainTabsBottomParamsList } from '../interfaces/ui';

const Tabs = createBottomTabNavigator<MainTabsBottomParamsList>();

/**
 * This is a main tabs bottom navigation.
 */
const MainTabsBottomNavigation = () => {
    const { state: { user } } = useAuth();
    const { state: { colors } } = useTheme();

    /**
     * Effect to set the external user id for push notifications.
     */
    useEffect(() => {
        OneSignal.setExternalUserId(user.id);
    }, []);

    return (
        <Tabs.Navigator
            sceneContainerStyle={{
                backgroundColor: colors.background
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.button,
                tabBarInactiveTintColor: colors.icon
            }}
            tabBar={ (props) => <TabBar { ...props } /> }
        >
            <Tabs.Screen
                component={ PreachingStackNavigation }
                name="PreachingStackNavigation"
                options={{
                    title: 'Inicio'
                }}
            />

            <Tabs.Screen
                component={ RevistsStackNavigation }
                name="RevistsStackNavigation"
                options={{
                    title: 'Revisitas',
                }}
            />

            <Tabs.Screen
                component={ CoursesStackNavigation }
                name="CoursesStackNavigation"
                options={{
                    title: 'Cursos'
                }}
            />
        </Tabs.Navigator>
    );
}

export default MainTabsBottomNavigation;