import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { CoursesNavigation, PreachingNavigation, RevisitsNavigation, SearchNavigation } from './'

import { usePreaching, useTheme } from '../hooks';

const Tabs = createBottomTabNavigator();

const MainNavigation = () => {
    const { loadPreachings, setSelectedDate, state: { selectedDate } } = usePreaching();
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

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    useEffect(() => {
        loadPreachings(selectedDate);
    } ,[ selectedDate ]);

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
                component={ PreachingNavigation }
                name="PreachingNavigation"
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
                component={ SearchNavigation }
                name="SearchNavigation"
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
                component={ RevisitsNavigation }
                name="RevisitsNavigation"
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
                component={ CoursesNavigation }
                name="CoursesNavigation"
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

export default MainNavigation;