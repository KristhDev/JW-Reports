import React, { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Modules */
import { useAuth } from '../modules/auth';
import { CoursesStackNavigation } from '../modules/courses';
import { MainTabsBottomParamsList, TabBar } from '../modules/ui';
import { PreachingStackNavigation } from '../modules/preaching';
import { RevisitsStackNavigation } from '../modules/revisits';

/* Services */
import { notifications } from '../services';

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
     * Effect to listen notifications by user.
     */
    useEffect(() => {
        if (!user.id) return;
        notifications.listenNotificationsByUser(user.id);
    }, [ user.id ]);

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