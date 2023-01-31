import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PreachingStackNavigation } from './';
import { CoursesStackNavigation } from './courses';
import { RevistsStackNavigation } from './revisits';

import { TabBar } from '../components/ui';

import { useTheme } from '../hooks';

import { MainTabsBottomParamsList } from '../interfaces/ui';

const Tabs = createBottomTabNavigator<MainTabsBottomParamsList>();

const MainTabsBottomNavigation = () => {
    const { state: { colors } } = useTheme();

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