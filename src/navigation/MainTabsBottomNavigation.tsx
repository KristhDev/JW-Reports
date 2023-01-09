import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { CoursesStackNavigation, PreachingStackNavigation, SearchStackNavigation } from '.'
import { RevistsStackNavigation } from './revisits';

import { MainTabsBottomParamsList } from '../interfaces/ui';

import { useTheme } from '../hooks';

const Tabs = createBottomTabNavigator<MainTabsBottomParamsList>();

const MainTabsBottomNavigation = () => {
    const { state: { colors } } = useTheme();

    const tabsStyles = StyleSheet.create({
        tabBarStyle: {
            backgroundColor: colors.bottom,
            borderTopWidth: 0,
            paddingBottom: 7,
            height: 60
        },
        tabBarIconStyle: {
            marginBottom: -7
        },
        tabBarLabelStyle: {
            fontSize: 13,
        }
    });

    return (
        <Tabs.Navigator
            sceneContainerStyle={{
                backgroundColor: colors.background
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.button,
                tabBarHideOnKeyboard: true,
                tabBarIconStyle: tabsStyles.tabBarIconStyle,
                tabBarInactiveTintColor: colors.icon,
                tabBarLabelStyle: tabsStyles.tabBarLabelStyle,
                tabBarStyle: tabsStyles.tabBarStyle
            }}
        >
            <Tabs.Screen
                component={ PreachingStackNavigation }
                name="PreachingStackNavigation"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={ color }
                            name="home-outline"
                            size={ size }
                        />
                    ),
                    title: 'Inicio'
                }}
            />

            <Tabs.Screen
                component={ SearchStackNavigation }
                name="SearchStackNavigation"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={ color }
                            name="search-outline"
                            size={ size }
                        />
                    ),
                    title: 'Buscar'
                }}
            />

            <Tabs.Screen
                component={ RevistsStackNavigation }
                name="RevistsStackNavigation"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={ color }
                            name="briefcase-outline"
                            size={ size }
                        />
                    ),
                    title: 'Revisitas'
                }}
            />

            <Tabs.Screen
                component={ CoursesStackNavigation }
                name="CoursesStackNavigation"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={ color }
                            name="book-outline"
                            size={ size }
                        />
                    ),
                    title: 'Cursos'
                }}
            />
        </Tabs.Navigator>
    );
}

export default MainTabsBottomNavigation;