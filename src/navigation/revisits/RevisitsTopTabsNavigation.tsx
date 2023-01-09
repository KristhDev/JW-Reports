import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Revisits } from '../../screens/revisits';

import { useTheme } from '../../hooks';

import { RevistsTopTabsParamsList } from '../../interfaces/revisits';

const Tabs = createMaterialTopTabNavigator<RevistsTopTabsParamsList>();

const RevisitsTopTabsNavigation = () => {
    const { state: { colors } } = useTheme();

    return (
        <Tabs.Navigator
            overScrollMode="never"
            sceneContainerStyle={{
                backgroundColor: colors.contentHeader,
            }}
            screenOptions={{
                tabBarActiveTintColor: colors.button,
                tabBarStyle: {
                    backgroundColor: colors.contentHeader,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.header
                },
                tabBarInactiveTintColor: colors.headerText,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.button,
                }
            }}
        >
            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No haz agregado ninguna revisita.',
                    filter: 'all',
                    title: 'TODAS MIS REVISTAS',
                }}
                name="RevisitsScreen"
                options={{ title: 'Todas' }}
            />

            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No haz realizado ninguna revisita.',
                    filter: 'visited',
                    title: 'REVISTAS REALIZADAS'
                }}
                name="VisitedRevisitsScreen"
                options={{title: 'Visitadas' }}
            />

            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No tienes ninguna revista por hacer.',
                    filter: 'unvisited',
                    title: 'REVISTAS POR HACER'
                }}
                name="UnvisitedRevisitsScreen"
                options={{ title: 'Por Visitar' }}
            />
        </Tabs.Navigator>
    );
}

export default RevisitsTopTabsNavigation;