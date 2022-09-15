import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { StatusBarLayout } from '../layouts';

import { Home, Revisits, Search } from '../screens/preaching';

import { HeaderRight } from '../components/ui';

import { useTheme } from '../hooks';

const Tabs = createBottomTabNavigator();

const PreachingNavigation = () => {
    const { state: { colors } } = useTheme();

    const tabsStyles = StyleSheet.create({
        headerStyle: {
            backgroundColor: colors.header
        },
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
            fontSize: 14
        }
    });

    const HomeScreen = () => (
        <StatusBarLayout backgroundColor={ colors.header }>
            <Home />
        </StatusBarLayout>
    );

    const SearchScreen = () => (
        <StatusBarLayout backgroundColor={ colors.header }>
            <Search />
        </StatusBarLayout>
    );

    const RevisitsScreen = () => (
        <StatusBarLayout backgroundColor={ colors.header }>
            <Revisits />
        </StatusBarLayout>
    );

    return (
        <Tabs.Navigator
            sceneContainerStyle={{
                backgroundColor: colors.background
            }}
            screenOptions={{
                headerStyle: tabsStyles.headerStyle,
                headerTintColor: colors.headerText,
                tabBarActiveTintColor: colors.button,
                tabBarIconStyle: tabsStyles.tabBarIconStyle,
                tabBarLabelStyle: tabsStyles.tabBarLabelStyle,
                tabBarStyle: tabsStyles.tabBarStyle
            }}
        >
            <Tabs.Screen
                component={ HomeScreen }
                name="HomeScreen"
                options={{
                    headerRight: () => <HeaderRight />,
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
                component={ SearchScreen }
                name="SearchScreen"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={ color }
                            name="search-outline"
                            size={ size }
                        />
                    ),
                    title: 'Busqueda'
                }}
            />

            <Tabs.Screen
                component={ RevisitsScreen }
                name="RevisitsScreen"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={ color }
                            name="briefcase-outline"
                            size={ size }
                        />
                    ),
                    title: 'Revisitas',
                }}
            />
        </Tabs.Navigator>
    );
}

export default PreachingNavigation;