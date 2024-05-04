import React, { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OneSignal } from 'react-native-onesignal';

/* Modules */
import { CoursesStackNavigation } from '../modules/courses';
import { MainTabsBottomParamsList, TabBar } from '../modules/ui';
import { PreachingStackNavigation } from '../modules/preaching';
import { RevisitsStackNavigation } from '../modules/revisits';
import { useAuth } from '../modules/auth';

const Tabs = createBottomTabNavigator<MainTabsBottomParamsList>();

/**
 * This is a main tabs bottom navigation.
 *
 * @return {JSX.Element} rendered component to show tabs bottom navigation of main
 */
const MainTabsBottomNavigation = (): JSX.Element => {
    const { state: { user } } = useAuth();
    const { theme: { colors } } = useStyles();

    /**
     * Effect to set the external user id for push notifications.
     */
    useEffect(() => {
        OneSignal.login(user.id);
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
                component={ RevisitsStackNavigation }
                name="RevisitsStackNavigation"
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