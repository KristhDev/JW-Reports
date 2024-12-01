import React from 'react';
import { Tabs } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { TabBar } from '@ui';

export default function MianTabsLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: colors.background
                },
                tabBarActiveTintColor: colors.button,
                tabBarInactiveTintColor: colors.icon,
            }}
            tabBar={ (props) => <TabBar { ...props } /> }
        >
            <Tabs.Screen
                name="preaching"
                options={{
                    title: 'Inicio'
                }}
            />

            <Tabs.Screen
                name="revisits"
                options={{
                    title: 'Revisitas',
                }}
            />

            <Tabs.Screen
                name="courses"
                options={{
                    title: 'Cursos'
                }}
            />
        </Tabs>
    );
}