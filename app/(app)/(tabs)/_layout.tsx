import React from 'react';
import { Tabs } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { TabBar } from '@ui/components';

/* Hooks */
import { useTranslation } from '@ui/hooks';

export default function MianTabsLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    const { translate } = useTranslation();

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
                options={{ title: translate('navigation.titles.home') }}
            />

            <Tabs.Screen
                name="revisits"
                options={{ title: translate('navigation.titles.revisits') }}
            />

            <Tabs.Screen
                name="courses"
                options={{ title: translate('navigation.titles.courses') }}
            />
        </Tabs>
    );
}